import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { SignUpCard } from "./SignUpCard";


const SignUpPage = () => {
  return (
    <div className="h-svh relative flex justify-center items-center  mx-auto">
        <AnimatedBackground />
      <SignUpCard />
    </div>
  );
};
export default SignUpPage;
