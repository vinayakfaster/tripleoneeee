"use client";

import useRentModal from "@/hook/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

type Props = {};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

function RentModal({}: Props) {
  const router = useRouter();
  const rentModel = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: [],
      price: 1,
      title: "",
      description: "",
      contactPhone: "",
    },
  });

  const category    = watch("category");
  const location    = watch("location");
  const guestCount  = watch("guestCount");
  const roomCount   = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc    = watch("imageSrc");

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), []);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => setStep((v) => v - 1);
  const onNext = () => {
    // ── STEP VALIDATION before proceeding ──
    if (step === STEPS.CATEGORY && !category) {
      toast.error("Please select a category");
      return;
    }
    if (step === STEPS.LOCATION && !location) {
      toast.error("Please select a location");
      return;
    }
    if (step === STEPS.IMAGES) {
      const imgs = Array.isArray(imageSrc) ? imageSrc : [];
      if (imgs.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }
    }
    setStep((v) => v + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    // ── Final validation ──
    if (!data.title || !data.description || !data.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const imgs = Array.isArray(data.imageSrc) ? data.imageSrc : 
                 (data.imageSrc ? [data.imageSrc] : []);

    if (imgs.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    setIsLoading(true);

    // ── Build clean payload matching your Prisma schema ──
    const listingData = {
      title:         data.title,
      description:   data.description,
      imageSrc:      imgs,                              // array
      category:      data.category,
      roomCount:     Number(data.roomCount) || 1,
      bathroomCount: Number(data.bathroomCount) || 1,
      guestCount:    Number(data.guestCount) || 1,
      locationValue: data.location?.label || data.location?.value || "",
      price:         Number(data.price),
      contactPhone:  data.contactPhone || "",
    };

    console.log("Submitting listing:", listingData); // debug

    axios
      .post("/api/listings", listingData)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModel.onClose();
      })
      .catch((err) => {
        // Log full error for debugging
        console.error("Listing error:", err?.response?.data || err);
        const msg = err?.response?.data?.error || "Something went wrong";
        toast.error(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    return step === STEPS.PRICE ? "Create" : "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : "Back";
  }, [step]);

  // ── STEP BODY CONTENT ──

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto scrollbar-thin">
        {categories.map((item, index) => (
          <div key={index} className="col-span-1">
            <CategoryInput
              onClick={(cat) => setCustomValue("category", cat)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Search for the address or pin it on the map"
        />
        <Map
          selectedLatLng={{
            lat: location?.latlng?.[0] || 28.6139,
            lng: location?.latlng?.[1] || 77.2090,
          }}
          onSelectLocation={({ lat, lng, address }: { lat: number; lng: number; address: string }) =>
            setCustomValue("location", {
              label: address,
              latlng: [lat, lng],
            })
          }
        />
        {location?.label && (
          <div className="text-sm text-neutral-600 bg-neutral-50 border rounded-xl px-4 py-3">
            📍 <span className="font-medium">{location.label}</span>
          </div>
        )}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basics about your place" subtitle="What amenities do you have?" />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
        {/* Show count */}
        {Array.isArray(imageSrc) && imageSrc.length > 0 && (
          <p className="text-sm text-neutral-500 text-center">
            ✓ {imageSrc.length} photo{imageSrc.length > 1 ? "s" : ""} uploaded
          </p>
        )}
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Tell guests more about your place" subtitle="Add details to help them decide" />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="contactPhone"
          label="Phone Number (optional)"
          type="tel"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
        <Input
          id="price"
          label="Price per night (₹)"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* Summary before submitting */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-sm text-neutral-600 space-y-1">
          <p className="font-semibold text-neutral-800 mb-2">Summary</p>
          <p>📦 Category: <span className="text-neutral-900 font-medium">{category || "—"}</span></p>
          <p>📍 Location: <span className="text-neutral-900 font-medium">{location?.label || "—"}</span></p>
          <p>👥 Guests: <span className="text-neutral-900 font-medium">{guestCount}</span></p>
          <p>🛏 Rooms: <span className="text-neutral-900 font-medium">{roomCount}</span></p>
          <p>🚿 Bathrooms: <span className="text-neutral-900 font-medium">{bathroomCount}</span></p>
          <p>🖼 Photos: <span className="text-neutral-900 font-medium">
            {Array.isArray(imageSrc) ? imageSrc.length : (imageSrc ? 1 : 0)}
          </span></p>
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModel.isOpen}
      title="Start Hosting on TripleOne!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModel.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;