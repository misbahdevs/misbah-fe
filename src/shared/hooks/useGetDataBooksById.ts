export const useGetDataBooksById = async (
  id: string | null,
  accessToken: string | null | undefined
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return await res.json();
};
