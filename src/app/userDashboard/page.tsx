// "use client";

// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const UsersContent = dynamic(() => import("@/components/users"), {
//   loading: () => (
//     <div className="flex items-center justify-center min-h-screen">
//       Loading...
//     </div>
//   ),
// });

// export default function UsersPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("auth_token");
//     if (!token) {
//       router.push("/signin");
//     }
//   }, [router]);

//   return <UsersContent />;
// }