import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { SignInCard } from "./SignInCard";


const SignInPage = () => {
  return (
    <div className="h-svh relative flex items-center justify-center mx-auto">
        <AnimatedBackground />
      <SignInCard />
    </div>
  );
};

export default SignInPage;
