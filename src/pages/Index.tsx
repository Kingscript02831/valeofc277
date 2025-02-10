
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import NewsCard from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: news = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news:', error);
        throw error;
      }
      
      return data || [];
    }
  });

  return (
    <div className="min-h-screen flex flex-col pb-[72px] md:pb-0">
      <Navbar />
      <SubNav />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold">Notícias</h1>
          
          {isLoading ? (
            <p className="text-center py-8">Carregando notícias...</p>
          ) : news.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Nenhuma notícia encontrada.
            </p>
          ) : (
            news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
