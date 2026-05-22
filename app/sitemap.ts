import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://sukshmadarshini.com", lastModified: new Date() },
    { url: "https://sukshmadarshini.com/blogs", lastModified: new Date() },
    { url: "https://sukshmadarshini.com/services", lastModified: new Date() },
    { url: "https://sukshmadarshini.com/careers", lastModified: new Date() },
    { url: "https://sukshmadarshini.com/collaborations", lastModified: new Date() },
    { url: "https://sukshmadarshini.com/privacy-policy", lastModified: new Date() },
    { url: "https://sukshmadarshini.com/terms-of-service", lastModified: new Date() },
  ];
}