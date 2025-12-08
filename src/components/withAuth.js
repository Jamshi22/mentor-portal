"use client";

import { useRouter } from "next/navigation";
import { useAuthRedirect } from "./useAuthRedirect"; // Ensure correct path
import LoadingDots from '../components/LoadingDots'

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { isAuthenticated, isLoading } = useAuthRedirect();
    const router = useRouter();

    if (isLoading) {
      return <div><LoadingDots /></div>; // Customize loading state
    }

    if (!isAuthenticated) {
      router.push("/"); // Redirect if not authenticated
      return null;
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
