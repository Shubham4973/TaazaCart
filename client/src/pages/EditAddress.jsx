import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const EditAddress = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data } = await axios.get("/api/address/get");
        if (data.success) {
          const found = data.addresses.find((a) => a._id === id);
          if (found) setAddress(found);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAddress();
  }, [id]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/address/update/${id}`, {
        address,
      });
      if (data.success) {
        toast.success("Address Updated!");
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white p-6 shadow rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Edit Address</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="firstName"
          value={address.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full border p-2"
        />
        <input
          name="lastName"
          value={address.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full border p-2"
        />
        <input
          name="email"
          value={address.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2"
        />
        <input
          name="street"
          value={address.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full border p-2"
        />
        <input
          name="city"
          value={address.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border p-2"
        />
        <input
          name="state"
          value={address.state}
          onChange={handleChange}
          placeholder="State"
          className="w-full border p-2"
        />
        <input
          name="zipcode"
          value={address.zipcode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full border p-2"
        />
        <input
          name="country"
          value={address.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full border p-2"
        />
        <input
          name="phone"
          value={address.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md"
        >
          Update Address
        </button>
      </form>
    </div>
  );
};

export default EditAddress;
