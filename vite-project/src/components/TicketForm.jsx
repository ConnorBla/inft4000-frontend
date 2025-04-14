import React, { useState } from 'react';
import { postTicket } from '../services/api';
import '../styles/TicketForm.css';
import paramoreImage from '../assets/paramore.jpg'; // Add an image of Paramore to your assets folder

const TicketForm = () => {
    const [formData, setFormData] = useState({
        concertId: '1', // Pre-filled concert ID for Paramore
        email: '',
        name: '',
        phone: '',
        quantity: '',
        creditCard: '',
        expiration: '',
        securityCode: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        country: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.concertId) newErrors.concertId = 'Concert ID is required.';
        if (!formData.email) newErrors.email = 'Valid email is required.';
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.phone) newErrors.phone = 'Valid phone number is required.';
        if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0.';
        if (!formData.creditCard) newErrors.creditCard = 'Valid credit card number is required.';
        if (!formData.expiration) newErrors.expiration = 'Expiration date is required.';
        if (!formData.securityCode) newErrors.securityCode = 'Valid security code is required.';
        if (!formData.address) newErrors.address = 'Address is required.';
        if (!formData.city) newErrors.city = 'City is required.';
        if (!formData.province) newErrors.province = 'Province is required.';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required.';
        if (!formData.country) newErrors.country = 'Country is required.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            await postTicket(formData);
            alert('Ticket purchased successfully!');
        } catch (error) {
            if (error.message.includes('400')) {
                const serverErrors = JSON.parse(error.message);
                const mappedErrors = {};
                for (const field in serverErrors.errors) {
                    mappedErrors[field.toLowerCase()] = serverErrors.errors[field][0];
                }
                setErrors(mappedErrors);
            } else {
                console.error('Error purchasing ticket:', error);
                alert('Failed to purchase ticket. Please try again.');
            }
        }
    };

    return (
        <div className="ticket-form-container">
            {/* Concert Information */}
            <div className="concert-info">
                <img src={paramoreImage} alt="Paramore Live" className="concert-image" />
                <h1>Paramore Live in Concert</h1>
                <p><strong>Date:</strong> July 15, 2025</p>
                <p><strong>Venue:</strong> Scotiabank Arena, Toronto, ON</p>
                <p><strong>Description:</strong> Join Paramore for an unforgettable night of music and energy as they perform their greatest hits and new tracks from their latest album. Don't miss this incredible event!</p>
            </div>

            {/* Ticket Purchase Form */}
            <form onSubmit={handleSubmit}>
                <h2>Purchase Your Ticket</h2>
                <div>
                    <input
                        type="number"
                        name="concertId"
                        placeholder="Concert ID"
                        value={formData.concertId}
                        onChange={handleChange}
                        readOnly
                    />
                    {errors.concertid && <span className="error">{errors.concertid}</span>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    {errors.quantity && <span className="error">{errors.quantity}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="creditCard"
                        placeholder="Credit Card"
                        value={formData.creditCard}
                        onChange={handleChange}
                    />
                    {errors.creditcard && <span className="error">{errors.creditcard}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="expiration"
                        placeholder="Expiration Date (MM/YY)"
                        value={formData.expiration}
                        onChange={handleChange}
                    />
                    {errors.expiration && <span className="error">{errors.expiration}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="securityCode"
                        placeholder="Security Code"
                        value={formData.securityCode}
                        onChange={handleChange}
                    />
                    {errors.securitycode && <span className="error">{errors.securitycode}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="province"
                        placeholder="Province (e.g., ON)"
                        value={formData.province}
                        onChange={handleChange}
                    />
                    {errors.province && <span className="error">{errors.province}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                    {errors.postalcode && <span className="error">{errors.postalcode}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country (e.g., CA)"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    {errors.country && <span className="error">{errors.country}</span>}
                </div>
                <button type="submit">Purchase Ticket</button>
            </form>
        </div>
    );
};

export default TicketForm;