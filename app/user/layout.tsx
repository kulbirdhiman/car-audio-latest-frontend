"use client";
import Sidebar from "@/components/layout/UserMenu";
import Loader from "@/components/globals/Loader";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { myProfile } from "@/store/actions/auth";
import { USER_ROLE } from "../constants";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { loading, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(myProfile());
  }, [dispatch]);

  useEffect(() => {
  if (!loading) {
    if (!user) {
      router.push("/sign-in");
    } else if (user.role !== USER_ROLE.admin && user.role !== USER_ROLE.frontend_user) {
      router.push("/sign-in");
    }
    // Optional: redirect admin to specific admin page
    else if (user.role === USER_ROLE.admin) {
      router.push("/admin/departments");
    }
  }
}, [loading, user, router]);


  if (loading || !user) return <Loader />;

  return (
    <div className="flex w-full min-h-screen ">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-md p-4 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
