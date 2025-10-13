import { Button } from "@/components/ui/button";


export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <h1>Home</h1>
            <p>Welcome to the home page</p>
            <Button>Click me</Button>
        </div>
    );
}