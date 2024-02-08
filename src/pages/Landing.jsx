import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../Components/CocktailList";
import SearchForm from "../Components/SearchForm";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      const response = await axios.get(cocktailSearchUrl, {
        params: {
          s: searchTerm,
        },
      });
      return response.data.drinks;
    },
  };
};

export const loader = (queryClient) => {
  return async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "";
    const data = await queryClient.ensureQueryData(
      searchCocktailsQuery(searchTerm)
    );
    return {
      drinks: data,
      searchTerm,
    };
  };
};

const Landing = () => {
  const { drinks, searchTerm } = useLoaderData();
  // const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  return (
    <>
      <>
        <SearchForm searchTerm={searchTerm} />
        <CocktailList drinks={drinks} />
      </>
    </>
  );
};
export default Landing;
