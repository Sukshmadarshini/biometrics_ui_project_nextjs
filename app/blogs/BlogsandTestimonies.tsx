"use client";

import { useState, useEffect } from "react";
import { BookOpen, Quote, Calendar, User, Heart, MessageCircle, Share2, Send } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "../hooks/use-toast";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  content: any[];       // Portable Text blocks
  author: string;
  date: string;
  readTime: string;
  likes: number;
  thumbnail?: { url: string };
};

type Testimony = {
  quote: string;
  name: string;
  role: string;
  organization: string;
};

type Comment = {
  id: string;
  name: string;
  text: string;
  date: string;
};

// Only "did THIS user like it" lives in localStorage
const LIKED_KEY = "sukshmadarshini_liked";

const BlogsAndTestimonies = ({
  blogs,
  testimonies,
}: {
  blogs: Blog[];
  testimonies: Testimony[];
}) => {
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);

  // liked: per-user, localStorage only
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // likes count + comments: from Sanity (seeded from props, then live)
  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    Object.fromEntries(blogs.map((b) => [b.id, b.likes ?? 0]))
  );
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(
    Object.fromEntries(blogs.map((b) => [b.id, []]))
  );

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Load per-user liked state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LIKED_KEY);
      if (stored) setLiked(JSON.parse(stored));
    } catch {}
  }, []);

  // Fetch live comments from Sanity on mount
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch("/api/blog/comment");
        if (!res.ok) return;
        const data: Record<string, Comment[]> = await res.json();
        setCommentsMap(data);
      } catch {}
    }
    fetchComments();
  }, []);

  const persistLiked = (next: Record<string, boolean>) => {
    setLiked(next);
    try { localStorage.setItem(LIKED_KEY, JSON.stringify(next)); } catch {}
  };

  const toggleLike = async (blogId: string) => {
    const alreadyLiked = liked[blogId];
    const increment = alreadyLiked ? -1 : 1;

    // Optimistic update
    persistLiked({ ...liked, [blogId]: !alreadyLiked });
    setLikesMap((prev) => ({
      ...prev,
      [blogId]: Math.max(0, (prev[blogId] ?? 0) + increment),
    }));

    // Sync to Sanity
    try {
      await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, increment }),
      });
    } catch {}
  };

  const addComment = async (blogId: string) => {
    const name = commentName.trim();
    const text = commentText.trim();
    if (!name || !text) {
      toast({ title: "Add your name and comment", variant: "destructive" });
      return;
    }
    if (name.length > 60 || text.length > 500) {
      toast({ title: "Please keep inputs concise", variant: "destructive" });
      return;
    }
    const newComment: Comment = {
      id: crypto.randomUUID(),
      name,
      text,
      date: new Date().toLocaleDateString(),
    };

    // Optimistic update
    setCommentsMap((prev) => ({
      ...prev,
      [blogId]: [...(prev[blogId] ?? []), newComment],
    }));
    setCommentName("");
    setCommentText("");

    // Sync to Sanity
    try {
      await fetch("/api/blog/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId, comment: newComment }),
      });
    } catch {
      toast({ title: "Failed to save comment", variant: "destructive" });
    }
  };

  const shareBlog = async (blog: Blog) => {
    const url = `${window.location.origin}${window.location.pathname}#${blog.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: blog.title, text: blog.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copied to clipboard" });
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="container mx-auto px-4 py-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Blogs & Testimonies</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient block mb-4">
            Scientific Agriculture and Plant Science Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {/* Read our latest articles on agri-proteomics and hear from collaborators we have worked with. */}
            Explore research-backed articles on agriculture, plant science, crop diagnostics, proteomics, sustainable farming, and scientific innovation in agriculture.
          </p>
        </section>

        {/* Blogs */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient block mb-10 text-center">
            Latest Blogs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow flex flex-col"
              >
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {blog.excerpt}
                </p>
                <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{blog.date} · {blog.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" /> {likesMap[blog.id] ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" /> {(commentsMap[blog.id] ?? []).length}
                    </span>
                  </div>
                  <Button size="sm" onClick={() => setOpenBlog(blog)}>
                    Read more
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonies */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient block mb-10 text-center">
            Testimonies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonies.map((t, idx) => (
              <article
                key={idx}
                className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow flex flex-col"
              >
                <Quote className="w-6 h-6 text-primary mb-4" />
                <p className="text-sm text-foreground leading-relaxed italic mb-5 flex-1">
                  {t.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-gradient block">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.organization}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Blog Dialog */}
      <Dialog open={!!openBlog} onOpenChange={(open) => !open && setOpenBlog(null)}>
        <DialogContent className="p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
          {openBlog && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{openBlog.title}</DialogTitle>
                <DialogDescription>
                  {openBlog.author} · {openBlog.date} · {openBlog.readTime}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="flex-1 pr-4 -mr-4">
                {/* Portable Text content */}
                <div className="space-y-4 text-sm text-foreground leading-relaxed prose prose-sm max-w-none">
                  <PortableText value={openBlog.content} />
                </div>

                {/* Engagement bar */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border">
                  <Button
                    variant={liked[openBlog.id] ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleLike(openBlog.id)}
                  >
                    <Heart className={liked[openBlog.id] ? "fill-current" : ""} />
                    {likesMap[openBlog.id] ?? 0} Likes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => shareBlog(openBlog)}>
                    <Share2 />
                    Share
                  </Button>
                </div>

                {/* Comments */}
                <div className="mt-6">
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Comments ({(commentsMap[openBlog.id] ?? []).length})
                  </h4>
                  <div className="space-y-3 mb-4">
                    {(commentsMap[openBlog.id] ?? []).length === 0 && (
                      <p className="text-xs text-muted-foreground">No comments yet. Be the first.</p>
                    )}
                    {(commentsMap[openBlog.id] ?? []).map((c) => (
                      <div key={c.id} className="border border-border rounded-lg p-3 bg-muted/30">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-foreground">{c.name}</p>
                          <p className="text-[10px] text-muted-foreground">{c.date}</p>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 m-1">
                    <Input
                      placeholder="Your name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      maxLength={60}
                    />
                    <Textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      maxLength={500}
                      rows={3}
                    />
                    <Button size="sm" onClick={() => addComment(openBlog.id)} className="w-full">
                      <Send />
                      Post comment
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* <Footer /> */}
    </div>
  );
};

export default BlogsAndTestimonies;