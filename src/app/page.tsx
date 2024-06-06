'use client';

import AdItem from "@/components/AdItem";
import SearchForm from "@/components/SearchForm";
import { Ad } from "@/models/Ad";
import { useEffect, useState } from "react";



export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  useEffect(() => {
    fetchAds();
  }, []);  


  function fetchAds(params?: URLSearchParams) {
    const url = params?`/api/ads?${params.toString()}`:`/api/ads/`;
    console.log({url});
    fetch(url).then(response => {
      response.json().then(adsDocs => {
        setAds(adsDocs)
      });
  });
  }


  function handleSearch(formData:FormData){
    const data = Object.fromEntries(formData);
    const params = new URLSearchParams();
    formData.forEach((value, key)=>{
      if(typeof value === 'string') {
        params.set(key, value);
      }
    });
    fetchAds(params);
  }
  
  return (
    <>
    <div className="flex w-full">

      <SearchForm action={handleSearch}/>

      <div className="p-4 grow bg-gray-100 w-3/4">
        <h2 className="font-bold mb-4 mt-2">Latest Products</h2>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-6">
        {ads.map(ad => (
          <AdItem key={ad._id} ad={ad}/>
        ))}
      </div>
      </div>
    </div>
    </>
  );
}
