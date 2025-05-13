export const getPatients = async () => {
    try {
        const response = await fetch("http://127.0.0.1/patients/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        
        if (!response.ok) throw new Error("Erro na requisição");

        const data = await response.json()
        return data

    } catch(err) {
        console.log(err)
    }
}