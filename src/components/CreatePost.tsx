import { useState } from "react";
import { Camera, Smile, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface CreatePostProps {
  onPostCreate?: (post: any) => void;
}

const categories = ["Relationships", "Work & School", "Technology", "Money", "Aging", "Food & Eating", "Pop Culture"];

const CreatePost = ({ onPostCreate }: CreatePostProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [sentiment, setSentiment] = useState<"good" | "bad" | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !sentiment) return;

    const newPost = {
      id: Date.now().toString(),
      title,
      description,
      category: category.toLowerCase(),
      sentiment,
      author: "You",
      timestamp: "just now",
      likes: 0,
      comments: 0,
      isLiked: false
    };

    onPostCreate?.(newPost);
    
    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setSentiment("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Share Your Moment
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="What happened? Give it a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
          </div>

          <div>
            <Textarea
              placeholder="Tell us the story behind this moment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={sentiment === "good" ? "default" : "outline"}
                size="sm"
                onClick={() => setSentiment("good")}
                className={sentiment === "good" ? "bg-positive hover:bg-positive/90" : ""}
              >
                <Smile className="h-4 w-4 mr-1" />
                Good
              </Button>
              <Button
                type="button"
                variant={sentiment === "bad" ? "default" : "outline"}
                size="sm"
                onClick={() => setSentiment("bad")}
                className={sentiment === "bad" ? "bg-negative hover:bg-negative/90" : ""}
              >
                <Frown className="h-4 w-4 mr-1" />
                Challenging
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!title || !description || !category || !sentiment}
          >
            Share Your Moment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;