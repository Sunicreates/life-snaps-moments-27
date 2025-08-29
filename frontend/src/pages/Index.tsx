import { useState } from "react";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import CategoryFilter from "@/components/CategoryFilter";
import CreatePost from "@/components/CreatePost";
import SignInModal from "@/components/SignInModal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Sample data for demonstration
const initialPosts = [
  {
    id: "1",
    title: "My dog learned to open doors today!",
    description: "I came home to find Max had figured out how to open the kitchen door. He was sitting there looking so proud of himself. I'm both impressed and terrified of what he'll learn next!",
    category: "dog",
    sentiment: "good" as const,
    author: "Sarah Chen",
    authorAvatar: "",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: true
  },
  {
    id: "2",
    title: "Flat tire on the highway",
    description: "Got a flat tire during rush hour traffic. Thankfully a kind stranger stopped to help me change it. Sometimes challenging moments remind you of the good in people.",
    category: "car",
    sentiment: "bad" as const,
    author: "Mike Johnson",
    authorAvatar: "",
    timestamp: "4 hours ago",
    likes: 12,
    comments: 15,
    isLiked: false
  },
  {
    id: "3",
    title: "Surprise promotion at work!",
    description: "My manager called me into her office and I thought I was in trouble. Turns out they're promoting me to senior developer! Still can't believe it's real.",
    category: "work",
    sentiment: "good" as const,
    author: "Alex Rivera",
    authorAvatar: "",
    timestamp: "6 hours ago",
    likes: 45,
    comments: 12,
    isLiked: true
  },
  {
    id: "4",
    title: "Found the perfect coffee shop",
    description: "Discovered this tiny family-owned coffee shop tucked away in an alley. Best espresso I've ever had and the owner's grandmother makes fresh pastries every morning.",
    category: "food",
    sentiment: "good" as const,
    author: "Emma Wilson",
    authorAvatar: "",
    timestamp: "1 day ago",
    likes: 18,
    comments: 6,
    isLiked: false
  }
];

const Index = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSentiment, setSentiment] = useState<"all" | "good" | "bad">("all");
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState<any>(auth.currentUser);

  // Listen for auth state changes
  useState(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  });

  const handlePostCreate = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  const handleRequireSignIn = () => setShowSignIn(true);

  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const sentimentMatch = selectedSentiment === "all" || post.sentiment === selectedSentiment;
    return categoryMatch && sentimentMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/5">
      <Header onSignInClick={() => setShowSignIn(true)} user={user} />
      <SignInModal open={showSignIn} onClose={() => setShowSignIn(false)} />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              selectedSentiment={selectedSentiment}
              onCategoryChange={setSelectedCategory}
              onSentimentChange={setSentiment}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <CreatePost onPostCreate={handlePostCreate} onRequireSignIn={handleRequireSignIn} user={user} />

            {/* Posts Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {selectedCategory === "all" ? "All Moments" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Moments`}
                  {selectedSentiment !== "all" && ` • ${selectedSentiment === "good" ? "Good" : "Challenging"}`}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredPosts.length} moment{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">No moments found</p>
                    <p className="text-sm">Try adjusting your filters or share the first moment!</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;