import Link from "next/link";

function Page() {
    return (
    <div className="flex flex-col px-6">
        <div className="container mx-auto flex flex-col items-center py-12">

          <div className="flex flex-col w-full max-w-md border rounded-lg p-6 gap-6">
            <div>
              <h1 className="text-xl mb-2">Next Firebase App</h1>
              <p className="text-sm text-gray-500">
                This app is a whitelabel to quick create new apps
              </p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <Link href="/signin" className="text-blue-500">
                Enter with credentials
              </Link>
              or
              <Link href="/signup" className="text-blue-500">
                Create an account
              </Link>
            </div>
            
          </div>
        </div>
    </div>
    );
}

export default Page;