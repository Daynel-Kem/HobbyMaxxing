import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
	cloud: {
		cloudName: "dkteitjxk",
	},
	url: {
		secure: true,
	},
});

export const uploadToCloudinary = async (imageUri: string): Promise<string> => {

  const data = new FormData();

  const fileName = `upload_${Date.now()}.jpg`;

  data.append("file", {
    uri: imageUri,
    type: "image/jpeg",
    name: fileName,
  } as any);

  data.append("upload_preset", "community");
  data.append("folder", "community");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dkteitjxk/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  console.log("Cloudinary response:", result);

  if (!response.ok) {
    throw new Error(JSON.stringify(result));
  }

  return result.secure_url;
};