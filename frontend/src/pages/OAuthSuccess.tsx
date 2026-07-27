import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {

    const [params] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {

        const token = params.get("token");

        const refreshToken = params.get("refreshToken");

        if (token) {

            localStorage.setItem("accessToken", token);

        }

        if (refreshToken) {

            localStorage.setItem("refreshToken", refreshToken);

        }

        navigate("/dashboard");

    }, []);

    return <h3>Signing you in...</h3>;

}