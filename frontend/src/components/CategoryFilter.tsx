import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryFilterProps {
  selectedCategory?: string;
  selectedSentiment?: "all" | "good" | "bad";
  onCategoryChange: (category: string) => void;
  onSentimentChange: (sentiment: "all" | "good" | "bad") => void;
}

const categories = [
  { name: "All", value: "all" },
  { name: "Relationships", value: "relationships" },
  { name: "Work & School", value: "work-school" },
  { name: "Technology", value: "technology" },
  { name: "Money", value: "money" },
  { name: "Aging", value: "aging" },
  { name: "Food & Eating", value: "food" },
  { name: "Pop Culture", value: "pop-culture" }
];

const sentiments = [
  { name: "All", value: "all" as const },
  { name: "Good Moments", value: "good" as const },
  { name: "Challenging", value: "bad" as const }
];

const CategoryFilter = ({ 
  selectedCategory = "all", 
  selectedSentiment = "all",
  onCategoryChange,
  onSentimentChange 
}: CategoryFilterProps) => {
  const getCategoryColor = (category: string) => {
    if (category === "all") return "bg-primary text-primary-foreground";
    
    const colors: Record<string, string> = {
      relationships: "bg-category-relationships text-white",
      "work-school": "bg-category-work text-white", 
      technology: "bg-category-technology text-white",
      money: "bg-category-money text-white",
      aging: "bg-category-aging text-white",
      food: "bg-category-food text-white",
      "pop-culture": "bg-category-pop-culture text-white"
    };
    return colors[category] || "bg-primary text-primary-foreground";
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "all") return "bg-primary text-primary-foreground";
    return sentiment === "good" 
      ? "bg-positive text-positive-foreground" 
      : "bg-negative text-negative-foreground";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  className={`cursor-pointer transition-colors hover:opacity-80 ${
                    selectedCategory === category.value 
                      ? getCategoryColor(category.value)
                      : "hover:bg-accent"
                  }`}
                  onClick={() => onCategoryChange(category.value)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Sentiment</h3>
            <div className="flex flex-wrap gap-2">
              {sentiments.map((sentiment) => (
                <Badge
                  key={sentiment.value}
                  variant={selectedSentiment === sentiment.value ? "default" : "outline"}
                  className={`cursor-pointer transition-colors hover:opacity-80 ${
                    selectedSentiment === sentiment.value 
                      ? getSentimentColor(sentiment.value)
                      : "hover:bg-accent"
                  }`}
                  onClick={() => onSentimentChange(sentiment.value)}
                >
                  {sentiment.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryFilter;