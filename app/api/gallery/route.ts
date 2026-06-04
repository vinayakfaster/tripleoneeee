// app/api/gallery/route.ts

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDERS = [
  { folder: "tpo/Subhash Nagar",  label: "Subhash Nagar",  tag: "Property" },
  { folder: "tpo/Ramesh Nagar",   label: "Ramesh Nagar",   tag: "Property" },
  { folder: "tpo/DLF Motinagar_", label: "DLF Motinagar",  tag: "Property" },
  { folder: "tpo/4325",           label: "4325",            tag: "Suite"    },
  { folder: "tpo/4323",           label: "4323",            tag: "Suite"    },
  { folder: "tpo/4308",           label: "4308",            tag: "Suite"    },
  { folder: "tpo/3815",           label: "3815",            tag: "Suite"    },
  { folder: "tpo/3509",           label: "3509",            tag: "Suite"    },
  { folder: "tpo/3312",           label: "3312",            tag: "Suite"    },
  { folder: "tpo/2512",           label: "2512",            tag: "Suite"    },
];

function makeUrl(publicId: string, opts: object) {
  return cloudinary.url(publicId, { secure: true, ...opts });
}

export async function GET() {
  try {
    const results = await Promise.all(
      FOLDERS.map(async ({ folder, label, tag }) => {
        // Use search API with exact folder match
        const res = await cloudinary.search
          .expression(`folder="${folder}"`)
          .sort_by("public_id", "asc")
          .max_results(50)
          .execute();

        console.log(`folder="${folder}" → ${res.resources?.length ?? 0} images`);

        const images = (res.resources || []).map((r: any) => ({
          src: makeUrl(r.public_id, {
            quality:      "auto",
            fetch_format: "auto",
            width:        1200,
            crop:         "limit",
          }),
          thumb: makeUrl(r.public_id, {
            quality:      "auto",
            fetch_format: "auto",
            width:        600,
            height:       400,
            crop:         "fill",
            gravity:      "auto",
          }),
          label:  r.public_id.split("/").pop() || label,
          folder: label,
          tag,
        }));

        return { folder: label, tag, images };
      })
    );

    const totalImages = results.reduce((a, f) => a + f.images.length, 0);
    console.log(`✅ Total images fetched: ${totalImages}`);

    return NextResponse.json({ folders: results });
  } catch (err: any) {
    console.error("Gallery API error:", err?.message);
    return NextResponse.json({ error: err?.message || "Failed to fetch" }, { status: 500 });
  }
}