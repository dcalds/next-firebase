'use client'
import React, { useEffect } from "react";
import { useAuthContext } from "@/contexts/auth";
import { redirect } from "next/navigation";
import { logOut } from "@/firebase/auth";

function Dashboard() {
  const { user } = useAuthContext()
  if (!user || user == null) redirect("/");

  return (
    <div className="flex flex-col px-6">
        <div className="container mx-auto flex flex-col items-center py-12">

          <div className="flex flex-col w-full max-w-md border rounded-lg p-6 gap-6">
            <h1 className="text-xl">Dashboard</h1>
            <p>{user.email}</p>              
            <p>{user.uid}</p>
            <p>{user.metadata.creationTime}</p>
            <button 
              className="w-full py-3 rounded-lg bg-red-500 text-white hover:bg-red-700 transition-all"
              onClick={() => logOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;