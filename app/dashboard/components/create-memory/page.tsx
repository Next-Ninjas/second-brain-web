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
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

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
      tanstackQueryClient.invalidateQueries({ queryKey: ["recent-memories"] });
    },
    onSettled: () => {
      reset();
      setTags([]);
      setTagInput("");
    },
  });

  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      content: "",
      isFavorite: false,
    },
    onSubmit: ({ value }) => {
      createMemoryMutation.mutate({
        title: value.title,
        content: value.content,
        tags,
        isFavorite: value.isFavorite,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span className="px-4 py-2 rounded-full border border-green-400 text-green-400 font-medium text-sm shadow-sm flex items-center gap-2 transition-all duration-200 hover:bg-green-400 hover:text-white dark:hover:text-black cursor-pointer">
          ✍️ Thought Captures
        </span>
      </DialogTrigger>

      <DialogContent className="max-w-xl w-full text-black dark:text-white">
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

          {/* Tag Input & Badge UI */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-sm text-gray-800 dark:text-white"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={() => {
                      setTags(tags.filter((_, i) => i !== index));
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value.replace(",", ""))}
              onKeyDown={(e) => {
                const trimmedTag = tagInput.trim();
                if ((e.key === "," || e.key === "Enter") && trimmedTag) {
                  e.preventDefault();
                  if (!tags.includes(trimmedTag)) {
                    setTags([...tags, trimmedTag]);
                  }
                  setTagInput("");
                } else if (
                  e.key === "Backspace" &&
                  tagInput === "" &&
                  tags.length > 0
                ) {
                  setTags(tags.slice(0, -1));
                }
              }}
              onBlur={() => {
                const trimmedTag = tagInput.trim();
                if (trimmedTag && !tags.includes(trimmedTag)) {
                  setTags([...tags, trimmedTag]);
                }
                setTagInput("");
              }}
              placeholder="Type and press comma or Enter to add tag"
            />
          </div>

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
