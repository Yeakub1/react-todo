import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAxiousSecure = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["PublicData"],
    queryFn: async () => {
      try {
        const response = await axios.get("https://task-url.vercel.app/files");
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  return [data, refetch, isLoading];
};

export default useAxiousSecure;
