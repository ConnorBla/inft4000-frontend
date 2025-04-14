const API_URL_BASE = 'https://nscc-0489003-inft4000-a3-tickethub-hfhcb3hydqh9fxdc.canadacentral-01.azurewebsites.net/';
// const API_URL_BASE = 'https://localhost:7287';

export const postTicket = async (ticket) => {
    try {
        const response = await fetch(`${API_URL_BASE}/api/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticket),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Parse the JSON response
            console.log(errorData.errors);

            throw new Error(JSON.stringify(errorData)); // Throw the parsed error
        }

        return await response.json(); // Parse and return the successful response
    } catch (error) {
        throw new Error(error.message); // Re-throw the error
    }
};