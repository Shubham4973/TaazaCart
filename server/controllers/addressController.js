import Address from "../models/Address.js";

// Add Address
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.userId;
        await Address.create({ ...address, userId });
        res.json({ success: true, message: "Address Added Successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get Addresses
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update Address
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params; // address id
        const { address } = req.body;
        const userId = req.userId;

        const updated = await Address.findOneAndUpdate(
            { _id: id, userId }, // ensure user owns the address
            { $set: address },
            { new: true }
        );

        if (!updated) {
            return res.json({ success: false, message: "Address not found" });
        }

        res.json({ success: true, message: "Address Updated Successfully", address: updated });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete Address
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params; // address id
        const userId = req.userId;

        const deleted = await Address.findOneAndDelete({ _id: id, userId });

        if (!deleted) {
            return res.json({ success: false, message: "Address not found" });
        }

        res.json({ success: true, message: "Address Deleted Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
