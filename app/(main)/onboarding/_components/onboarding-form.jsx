"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Building2, Briefcase, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed! Your AI coach is ready.");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background min-h-[80vh] py-10">
      <div className="w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Complete Your Profile</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Tell us about your background so we can instantly calibrate the AI specifically to your career goals.
          </p>
        </div>

        <Card className="border-2 shadow-xl shadow-primary/5">
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Industry Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-bold border-b pb-2">
                  <Building2 className="w-5 h-5 text-primary" /> Industry Focus
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm font-semibold">Primary Industry</Label>
                    <Select
                      onValueChange={(value) => {
                        setValue("industry", value);
                        setSelectedIndustry(
                          industries.find((ind) => ind.id === value)
                        );
                        setValue("subIndustry", "");
                      }}
                    >
                      <SelectTrigger id="industry" className="h-12 bg-muted/30 focus:border-primary">
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Industries</SelectLabel>
                          {industries.map((ind) => (
                            <SelectItem key={ind.id} value={ind.id}>
                              {ind.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className="text-sm text-red-500 font-medium">{errors.industry.message}</p>
                    )}
                  </div>

                  {watchIndustry && (
                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-300">
                      <Label htmlFor="subIndustry" className="text-sm font-semibold">Specialization</Label>
                      <Select
                        onValueChange={(value) => setValue("subIndustry", value)}
                      >
                        <SelectTrigger id="subIndustry" className="h-12 bg-muted/30 focus:border-primary">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Specializations</SelectLabel>
                            {selectedIndustry?.subIndustries.map((sub) => (
                              <SelectItem key={sub} value={sub}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.subIndustry && (
                        <p className="text-sm text-red-500 font-medium">{errors.subIndustry.message}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Experience Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-bold border-b pb-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Experience & Skills
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-semibold">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      max="50"
                      placeholder="e.g., 2"
                      className="h-12 bg-muted/30 focus:border-primary"
                      {...register("experience")}
                    />
                    {errors.experience && (
                      <p className="text-sm text-red-500 font-medium">{errors.experience.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-sm font-semibold">Key Skills</Label>
                    <Input
                      id="skills"
                      placeholder="e.g. React, Python, Management"
                      className="h-12 bg-muted/30 focus:border-primary"
                      {...register("skills")}
                    />
                    <p className="text-xs text-muted-foreground font-medium">Comma separated list</p>
                    {errors.skills && (
                      <p className="text-sm text-red-500 font-medium">{errors.skills.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-bold border-b pb-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> About You
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-semibold">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Briefly describe your current role, background, and what you are looking to achieve..."
                    className="min-h-[120px] bg-muted/30 focus:border-primary resize-none"
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500 font-medium">{errors.bio.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" 
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Career Profile...</>
                  ) : (
                    "Save & Continue to Dashboard"
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4 font-medium">
                  Your data is only used to calibrate your personalized AI tools.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;
