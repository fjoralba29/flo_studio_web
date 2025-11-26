import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useUserStore } from "../store/userStore";
import { useRouter } from "next/navigation";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

interface LoginData {
    email: string;
    password: string;
}

const setUser = useUserStore.getState().setUser;
const clearUser = useUserStore.getState().clearUser;

export const useRegister = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: RegisterData) => {
            const { data: res } = await axios.post("/api/auth/register", data);
            return res;
        },
        onSuccess: (res) => {
            setUser(res.user); // save user to Zustand
            localStorage.setItem("token", res.token); // optional
            router.push("/login"); // redirect after registration
        },
        onError: (err) => {
            console.log(err);
        },
    });

    return mutation;
};

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: LoginData): Promise<any> => {
            const { data: res } = await axios.post("/api/auth/login", data);
            return res;
        },
        onSuccess: (res: any) => {
            setUser(res.user);
            localStorage.setItem("token", res.token);
            router.push("/");
        },
        onError: (error: Error) => {
            console.log(error);
        },
    });
};

export const logoutUser = async () => {
    const res = await axios.post("/api/auth/logout");
    return res.data;
};

export const useLogout = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            router.push("/login");
            localStorage.removeItem("token");
            clearUser();
        },
        onError: (error: any) => {
            console.error("Logout failed:", error.message);
        },
    });
};
