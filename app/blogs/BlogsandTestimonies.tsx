// "use client";

// import { useState, useEffect } from "react";
// import { BookOpen, Quote, Calendar, User, Heart, MessageCircle, Share2, Send } from "lucide-react";
// import { PortableText } from "@portabletext/react";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { ScrollArea } from "../components/ui/scroll-area";
// import { toast } from "../hooks/use-toast";

// type Blog = {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: any[];       // Portable Text blocks
//   author: string;
//   date: string;
//   readTime: string;
//   likes: number;
//   thumbnail?: { url: string };
// };

// type Testimony = {
//   quote: string;
//   name: string;
//   role: string;
//   organization: string;
// };

// type Comment = {
//   id: string;
//   name: string;
//   text: string;
//   date: string;
// };

// // Only "did THIS user like it" lives in localStorage
// const LIKED_KEY = "sukshmadarshini_liked";
// const BLOGS_STORAGE_KEY = "sukshmadarshini_user_blogs";

// const BlogsAndTestimonies = ({
//   blogs,
//   testimonies,
// }: {
//   blogs: Blog[];
//   testimonies: Testimony[];
// }) => {
//   const [openBlog, setOpenBlog] = useState<Blog | null>(null);

//   // liked: per-user, localStorage only
//   const [liked, setLiked] = useState<Record<string, boolean>>({});

//   // likes count + comments: from Sanity (seeded from props, then live)
//   const [likesMap, setLikesMap] = useState<Record<string, number>>(
//     Object.fromEntries(blogs.map((b) => [b.id, b.likes ?? 0]))
//   );
//   const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(
//     Object.fromEntries(blogs.map((b) => [b.id, []]))
//   );

//   const [commentName, setCommentName] = useState("");
//   const [commentText, setCommentText] = useState("");

//   const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newAuthor, setNewAuthor] = useState("");
//   const [newExcerpt, setNewExcerpt] = useState("");
//   const [newContent, setNewContent] = useState("");

//   // Load per-user liked state from localStorage
//   useEffect(() => {
//     try {
//       const stored = localStorage.getItem(LIKED_KEY);
//       if (stored) setLiked(JSON.parse(stored));
//     } catch {}
//   }, []);

//   // Fetch live comments from Sanity on mount
//   useEffect(() => {
//     async function fetchComments() {
//       try {
//         const res = await fetch("/api/blog/comment");
//         if (!res.ok) return;
//         const data: Record<string, Comment[]> = await res.json();
//         setCommentsMap(data);
//       } catch {}
//     }
//     fetchComments();
//   }, []);

//   const persistLiked = (next: Record<string, boolean>) => {
//     setLiked(next);
//     try { localStorage.setItem(LIKED_KEY, JSON.stringify(next)); } catch {}
//   };

//     const persistBlogs = (next: Blog[]) => {
//     setUserBlogs(next);
//     try {
//       localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(next));
//     } catch {
//       // ignore
//     }
//   };

//     const publishBlog = () => {
//     const title = newTitle.trim();
//     const author = newAuthor.trim() || "Anonymous";
//     const excerpt = newExcerpt.trim();
//     const content = newContent.trim();
//     if (!title || !content) {
//       toast({ title: "Title and content are required", variant: "destructive" });
//       return;
//     }
//     if (title.length > 120 || author.length > 60 || excerpt.length > 300 || content.length > 10000) {
//       toast({ title: "Please shorten your inputs", variant: "destructive" });
//       return;
//     }
//     const words = content.split(/\s+/).filter(Boolean).length;
//     const readTime = `${Math.max(1, Math.round(words / 200))} min read`;
//     const blog: Blog = {
//       id: crypto.randomUUID(),
//       title,
//       excerpt: excerpt || content.slice(0, 140) + (content.length > 140 ? "..." : ""),
//       content,
//       author,
//       date: new Date().toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" }),
//       readTime,
//     };
//     persistBlogs([blog, ...userBlogs]);
//     setNewTitle("");
//     setNewAuthor("");
//     setNewExcerpt("");
//     setNewContent("");
//     toast({ title: "Blog published" });
//   };

//   // const toggleLike = (blogId: string) => {
//   //   const liked = !engagement.liked[blogId];
//   //   const currentCount = engagement.likes[blogId] ?? 0;
//   //   persist({
//   //     ...engagement,
//   //     liked: { ...engagement.liked, [blogId]: liked },
//   //     likes: { ...engagement.likes, [blogId]: Math.max(0, currentCount + (liked ? 1 : -1)) },
//   //   });
//   // };


//   const toggleLike = async (blogId: string) => {
//     const alreadyLiked = liked[blogId];
//     const increment = alreadyLiked ? -1 : 1;

//     // Optimistic update
//     persistLiked({ ...liked, [blogId]: !alreadyLiked });
//     setLikesMap((prev) => ({
//       ...prev,
//       [blogId]: Math.max(0, (prev[blogId] ?? 0) + increment),
//     }));

//     // Sync to Sanity
//     try {
//       await fetch("/api/blog/like", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ blogId, increment }),
//       });
//     } catch {}
//   };

//   const addComment = async (blogId: string) => {
//     const name = commentName.trim();
//     const text = commentText.trim();
//     if (!name || !text) {
//       toast({ title: "Add your name and comment", variant: "destructive" });
//       return;
//     }
//     if (name.length > 60 || text.length > 500) {
//       toast({ title: "Please keep inputs concise", variant: "destructive" });
//       return;
//     }
//     const newComment: Comment = {
//       id: crypto.randomUUID(),
//       name,
//       text,
//       date: new Date().toLocaleDateString(),
//     };

//     // Optimistic update
//     setCommentsMap((prev) => ({
//       ...prev,
//       [blogId]: [...(prev[blogId] ?? []), newComment],
//     }));
//     setCommentName("");
//     setCommentText("");

//     // Sync to Sanity
//     try {
//       await fetch("/api/blog/comment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ blogId, comment: newComment }),
//       });
//     } catch {
//       toast({ title: "Failed to save comment", variant: "destructive" });
//     }
//   };

  

//   const shareBlog = async (blog: Blog) => {
//     const url = `${window.location.origin}${window.location.pathname}#${blog.id}`;
//     try {
//       if (navigator.share) {
//         await navigator.share({ title: blog.title, text: blog.excerpt, url });
//       } else {
//         await navigator.clipboard.writeText(url);
//         toast({ title: "Link copied to clipboard" });
//       }
//     } catch {}
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-24 md:pt-28">
//         {/* Hero */}
//         <section className="container mx-auto px-4 py-10 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
//             <BookOpen className="w-4 h-4" />
//             <span className="text-sm font-medium">Blogs & Testimonies</span>
//           </div>
//           <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient block mb-4">
//             Scientific Agriculture and Plant Science Insights
//           </h1>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             {/* Read our latest articles on agri-proteomics and hear from collaborators we have worked with. */}
//             Explore research-backed articles on agriculture, plant science, crop diagnostics, proteomics, sustainable farming, and scientific innovation in agriculture.
//           </p>
//         </section>

//         {/* Blogs */}
//         <section className="container mx-auto px-4 py-12">
//           <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient block mb-10 text-center">
//             Latest Blogs
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {blogs.map((blog) => (
//               <article
//                 key={blog.id}
//                 className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow flex flex-col"
//               >
//                 <h3 className="font-display text-xl font-semibold text-foreground mb-3">
//                   {blog.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
//                   {blog.excerpt}
//                 </p>
//                 <div className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4 mb-4">
//                   <div className="flex items-center gap-2">
//                     <User className="w-3.5 h-3.5 text-primary" />
//                     <span>{blog.author}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-3.5 h-3.5 text-primary" />
//                     <span>{blog.date} · {blog.readTime}</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between gap-2">
//                   <div className="flex items-center gap-3 text-xs text-muted-foreground">
//                     <span className="inline-flex items-center gap-1">
//                       <Heart className="w-3.5 h-3.5" /> {likesMap[blog.id] ?? 0}
//                     </span>
//                     <span className="inline-flex items-center gap-1">
//                       <MessageCircle className="w-3.5 h-3.5" /> {(commentsMap[blog.id] ?? []).length}
//                     </span>
//                   </div>
//                   <Button size="sm" onClick={() => setOpenBlog(blog)}>
//                     Read more
//                   </Button>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         {/* Testimonies */}
//         <section className="container mx-auto px-4 py-12 md:py-20">
//           <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient block mb-10 text-center">
//             Testimonies
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//             {testimonies.map((t, idx) => (
//               <article
//                 key={idx}
//                 className="border border-border rounded-2xl p-6 bg-card hover:shadow-lg transition-shadow flex flex-col"
//               >
//                 <Quote className="w-6 h-6 text-primary mb-4" />
//                 <p className="text-sm text-foreground leading-relaxed italic mb-5 flex-1">
//                   {t.quote}
//                 </p>
//                 <div className="border-t border-border pt-4">
//                   <p className="text-sm font-semibold text-gradient block">{t.name}</p>
//                   <p className="text-xs text-muted-foreground">{t.role} · {t.organization}</p>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Blog Dialog */}
//       <Dialog open={!!openBlog} onOpenChange={(open) => !open && setOpenBlog(null)}>
//         <DialogContent className="p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
//           {openBlog && (
//             <>
//               <DialogHeader>
//                 <DialogTitle className="font-display text-2xl">{openBlog.title}</DialogTitle>
//                 <DialogDescription>
//                   {openBlog.author} · {openBlog.date} · {openBlog.readTime}
//                 </DialogDescription>
//               </DialogHeader>

//               <ScrollArea className="flex-1 pr-4 -mr-4">
//                 {/* Portable Text content */}
//                 <div className="space-y-4 text-sm text-foreground leading-relaxed prose prose-sm max-w-none">
//                   <PortableText value={openBlog.content} />
//                 </div>

//                 {/* Engagement bar */}
//                 <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border">
//                   <Button
//                     variant={liked[openBlog.id] ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => toggleLike(openBlog.id)}
//                   >
//                     <Heart className={liked[openBlog.id] ? "fill-current" : ""} />
//                     {likesMap[openBlog.id] ?? 0} Likes
//                   </Button>
//                   <Button variant="outline" size="sm" onClick={() => shareBlog(openBlog)}>
//                     <Share2 />
//                     Share
//                   </Button>
//                 </div>

//                 {/* Comments */}
//                 <div className="mt-6">
//                   <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
//                     <MessageCircle className="w-4 h-4 text-primary" />
//                     Comments ({(commentsMap[openBlog.id] ?? []).length})
//                   </h4>
//                   <div className="space-y-3 mb-4">
//                     {(commentsMap[openBlog.id] ?? []).length === 0 && (
//                       <p className="text-xs text-muted-foreground">No comments yet. Be the first.</p>
//                     )}
//                     {(commentsMap[openBlog.id] ?? []).map((c) => (
//                       <div key={c.id} className="border border-border rounded-lg p-3 bg-muted/30">
//                         <div className="flex items-center justify-between mb-1">
//                           <p className="text-xs font-semibold text-foreground">{c.name}</p>
//                           <p className="text-[10px] text-muted-foreground">{c.date}</p>
//                         </div>
//                         <p className="text-xs text-foreground leading-relaxed">{c.text}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="space-y-2 m-1">
//                     <Input
//                       placeholder="Your name"
//                       value={commentName}
//                       onChange={(e) => setCommentName(e.target.value)}
//                       maxLength={60}
//                     />
//                     <Textarea
//                       placeholder="Add a comment..."
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       maxLength={500}
//                       rows={3}
//                     />
//                     <Button size="sm" onClick={() => addComment(openBlog.id)} className="w-full">
//                       <Send />
//                       Post comment
//                     </Button>
//                   </div>
//                 </div>
//               </ScrollArea>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default BlogsAndTestimonies;

"use client";

import { useState, useEffect } from "react";
import { BookOpen, Quote, Calendar, User, Heart, MessageCircle, Share2, Send, PenLine, X } from "lucide-react";
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

const LIKED_KEY = "sukshmadarshini_liked";

// Lazy initializer — reads localStorage once during render (no effect needed)
function getInitialLiked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(LIKED_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

const BlogsAndTestimonies = ({
  blogs,
  testimonies,
}: {
  blogs: Blog[];
  testimonies: Testimony[];
}) => {
  const [openBlog, setOpenBlog] = useState<Blog | null>(null);
  const [showWriteDialog, setShowWriteDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Fixed: lazy initializer instead of setState-in-effect
  const [liked, setLiked] = useState<Record<string, boolean>>(getInitialLiked);

  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    Object.fromEntries(blogs.map((b) => [b.id, b.likes ?? 0]))
  );
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>(
    Object.fromEntries(blogs.map((b) => [b.id, []]))
  );

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Submit blog form state
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");

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

  /**
   * Submit blog for approval.
   * Sends to /api/blog/submit which:
   *  1. Creates a Sanity doc with status:"pending"
   *  2. Emails sukshmadarshini@gmail.com with approve/reject links
   */
  const submitBlogForApproval = async () => {
    const title = newTitle.trim();
    const author = newAuthor.trim() || "Anonymous";
    const email = newEmail.trim();
    const excerpt = newExcerpt.trim();
    const content = newContent.trim();

    if (!title || !content) {
      toast({ title: "Title and content are required", variant: "destructive" });
      return;
    }
    if (title.length > 120 || author.length > 60 || excerpt.length > 300 || content.length > 10000) {
      toast({ title: "Please shorten your inputs", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/blog/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, email, excerpt, content }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Submission failed");
      }

      setNewTitle("");
      setNewAuthor("");
      setNewEmail("");
      setNewExcerpt("");
      setNewContent("");
      setShowWriteDialog(false);

      toast({
        title: "Blog submitted for review!",
        description: "The site owner will review and publish your post shortly.",
      });
    } catch (err: any) {
      toast({ title: err.message ?? "Failed to submit blog", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = async (blogId: string) => {
    const alreadyLiked = liked[blogId];
    const increment = alreadyLiked ? -1 : 1;

    persistLiked({ ...liked, [blogId]: !alreadyLiked });
    setLikesMap((prev) => ({
      ...prev,
      [blogId]: Math.max(0, (prev[blogId] ?? 0) + increment),
    }));

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

    setCommentsMap((prev) => ({
      ...prev,
      [blogId]: [...(prev[blogId] ?? []), newComment],
    }));
    setCommentName("");
    setCommentText("");

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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore research-backed articles on agriculture, plant science, crop diagnostics, proteomics, sustainable farming, and scientific innovation in agriculture.
          </p>
          {/* Write a blog CTA */}
          <Button onClick={() => setShowWriteDialog(true)} className="gap-2">
            <PenLine className="w-4 h-4" />
            Write a Blog
          </Button>
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

      {/* ── Read Blog Dialog ── */}
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
                <div className="space-y-4 text-sm text-foreground leading-relaxed prose prose-sm max-w-none">
                  <PortableText value={openBlog.content} />
                </div>

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

      {/* ── Write / Submit Blog Dialog ── */}
      <Dialog open={showWriteDialog} onOpenChange={setShowWriteDialog}>
        <DialogContent className="p-6 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl flex items-center gap-2">
              <PenLine className="w-5 h-5 text-primary" />
              Submit a Blog Post
            </DialogTitle>
            <DialogDescription>
              Your submission will be reviewed by the site owner before it goes live. You&apos;ll hear back soon!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Your blog title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                maxLength={120}
              />
              <p className="text-[10px] text-muted-foreground text-right">{newTitle.length}/120</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Author Name
                </label>
                <Input
                  placeholder="Anonymous"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  maxLength={60}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Your Email (optional)
                </label>
                <Input
                  type="email"
                  placeholder="for approval notification"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  maxLength={120}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Short Excerpt
              </label>
              <Input
                placeholder="One-line summary shown on the blog card (optional)"
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                maxLength={300}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Content <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Write your full blog post here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                maxLength={10000}
                rows={12}
                className="resize-none font-mono text-sm"
              />
              <p className="text-[10px] text-muted-foreground text-right">{newContent.length}/10000</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button
                onClick={submitBlogForApproval}
                disabled={isSubmitting}
                className="flex-1 gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting…" : "Submit for Review"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowWriteDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground text-center">
              By submitting, you agree your post may be edited for clarity before publishing.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogsAndTestimonies;