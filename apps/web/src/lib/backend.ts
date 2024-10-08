import { ICart } from "@/type/cart"
import { IDiscountType } from "@/type/discount"

export const getProvince = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/province`, {next: {revalidate: 1}})
    const data = await res.json()
    
    return data.result
}
export const getCity = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/city`, {next: {revalidate: 3600}})
    const data = await res.json()  

    return data.result
}


export const postTransaction = async (transaction: {userId: number, cart: ICart[], usePoints: boolean}, discount:{ id:number, totalCut:number }) => {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/transaction`, {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {"Content-Type":"application/json"}
    })
    
    const data = await res.json()

    return data;
}

export const verifyRole = async(token: string) => {
    if(!token) return 'no token';
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/checkRole`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const result = await res.json()
    return result
}