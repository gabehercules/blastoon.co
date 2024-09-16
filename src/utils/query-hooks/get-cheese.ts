import { getUserCheese } from "@/database/read/get-user-cheese";
import { useQuery } from "@tanstack/react-query";

export function useUserCheese(address: string) {
  return useQuery({
    queryKey: ["user-cheese"],
    queryFn: async () => getUserCheese(address),
  });
}
