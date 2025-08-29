import { Heart, MessageCircle, Share2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  sentiment: "good" | "bad";
  author: string;
  authorAvatar?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const PostCard = ({ 
  title, 
  description, 
  category, 
  sentiment, 
  author, 
  authorAvatar, 
  timestamp, 
  likes, 
  comments, 
  isLiked = false 
}: PostCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      relationships: "bg-category-relationships text-white",
      "work & school": "bg-category-work text-white", 
      technology: "bg-category-technology text-white",
      money: "bg-category-money text-white",
      aging: "bg-category-aging text-white",
      "food & eating": "bg-category-food text-white",
      "pop culture": "bg-category-pop-culture text-white"
    };
    return colors[category.toLowerCase()] || "bg-primary text-primary-foreground";
  };

  const getSentimentColor = (sentiment: string) => {
    return sentiment === "good" 
      ? "border-l-positive bg-positive/5" 
      : "border-l-negative bg-negative/5";
  };

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 ${getSentimentColor(sentiment)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={authorAvatar} alt={author} />
              <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">{author}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {timestamp}
                </div>
              </div>
            </div>
          </div>
          <Badge className={getCategoryColor(category)} variant="secondary">
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`gap-2 hover:text-red-500 ${isLiked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              {comments}
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="gap-2 hover:text-green-500">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;