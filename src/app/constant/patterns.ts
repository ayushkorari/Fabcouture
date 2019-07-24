export const PATTERN = {
    email:/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
    password:/^[^\s]+$/,
    name:/(.|\s)*\S(.|\s)*/,
    phone: "^[0-9]+$",
    price:/(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/
};