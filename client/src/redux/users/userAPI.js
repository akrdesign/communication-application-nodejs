import BaseAPI from "../../utils/BaseAPI";

export const fetchUsers = async () => {
  try {
    const response = await BaseAPI.get("/users");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await BaseAPI.get("/users/"+id);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await BaseAPI.patch("/users/"+user.id, user);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await BaseAPI.delete("/users/"+id);
    return response.data;
  } catch (error) {
    return error.response;
  }
};



// export function updateOrder(order) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/orders/'+order.id, {
//       method: 'PATCH',
//       body: JSON.stringify(order),
//       headers: { 'content-type': 'application/json' },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }