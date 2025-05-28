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
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { tanstackQueryClient } from "@/lib/integrations/tanstack-query";
import { serverUrl } from "@/lib/environment";

const CreateMemory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createMemoryMutation = useMutation({
    mutationFn: async ({
      title,
      content,
      tags,
      isFavorite,
    }: {
      title: string;
      content: string;
      tags?: string[];
      isFavorite?: boolean;
    }) => {
      const res = await fetch(`${serverUrl}/memories`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, tags, isFavorite }),
      });
      if (!res.ok) throw new Error("Failed to create memory");
      return res.json();
    },
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Memory created successfully.");
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
      isFavorite: false,
    },
    onSubmit: ({ value }) => {
      createMemoryMutation.mutate({
        title: value.title,
        content: value.content,
        tags: value.tags ? value.tags.split(",").map((tag) => tag.trim()) : [],
        isFavorite: value.isFavorite,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-black dark:text-white font-semibold px-6 py-3 rounded-xl">
          Add Memory
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle>What’s your memory?</DialogTitle>
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
