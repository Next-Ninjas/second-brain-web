"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { tanstackQueryClient } from "@/lib/integrations/tanstack-query";
import { toast } from "sonner";
import { serverUrl } from "@/lib/environment";

// Define a safe type for metadata
type MemoryMetadata = {
  location?: string;
  [key: string]: string | number | boolean | undefined;
};

const CreateMemory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createMemoryMutation = useMutation({
    mutationFn: async ({
      title,
      content,
      tags,
      metadata,
      isFavorite,
    }: {
      title: string;
      content: string;
      tags?: string[];
      metadata?: MemoryMetadata;
      isFavorite?: boolean;
    }) => {
      const res = await fetch(`${serverUrl}/memories`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags, metadata, isFavorite }),
      });
      if (!res.ok) throw new Error("Failed to create memory");
      return res.json();
    },
    onSuccess: () => {
      setIsOpen(false);
      toast("Memory created successfully.");
      tanstackQueryClient.invalidateQueries({ queryKey: ["memories"] });
    },
    onSettled: () => {
      reset();
    },
  });

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      metadata: "",
      isFavorite: false,
    },
    onSubmit: ({ value }) => {
      let parsedMetadata: MemoryMetadata | undefined = undefined;
      if (value.metadata) {
        try {
          parsedMetadata = JSON.parse(value.metadata);
        } catch  {
          toast.error("Metadata must be valid JSON.");
          return;
        }
      }

      createMemoryMutation.mutate({
        title: value.title,
        content: value.content,
        tags: value.tags ? value.tags.split(",").map((tag) => tag.trim()) : [],
        metadata: parsedMetadata,
        isFavorite: value.isFavorite,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="rounded-xl shadow border dark:bg-[#050314] p-4 w-full max-w-6xl mx-auto mb-4">
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 border border-blue-400 text-gray-500 px-4 py-2 rounded-full dark:hover:bg-gray-950 transition">
              Create a memory
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle>What&apos;s your memory?</DialogTitle>
          <DialogDescription>Share a personal memory.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          className="space-y-4"
        >
          <Field name="title">
            {(field) => (
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Memory title"
              />
            )}
          </Field>

          <Field name="content">
            {(field) => (
              <Textarea
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Describe your memory"
                className="resize-none min-h-[120px]"
              />
            )}
          </Field>

          <Field name="tags">
            {(field) => (
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Tags (comma-separated)"
              />
            )}
          </Field>

          <Field name="metadata">
            {(field) => (
              <Input
                id={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='Metadata (JSON format, e.g. {"location":"Paris"})'
              />
            )}
          </Field>

          <Field name="isFavorite">
            {(field) => (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                <span>Mark as favorite</span>
              </label>
            )}
          </Field>

          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={
                  !canSubmit || isSubmitting || createMemoryMutation.isPending
                }
              >
                {createMemoryMutation.isPending && <Spinner className="mr-2" />}
                Create Memory
              </Button>
            )}
          </Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMemory;
