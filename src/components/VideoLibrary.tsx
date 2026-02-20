import { Play, Video, Lock, ArrowRight, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoLibrary = () => {
  const brettVideos = [
    { topic: "Anger Management", title: "Overcoming Anger: Tools for a Calmer Life", description: "Discover how to transform anger into clarity and balance with expert guidance from Brett at Intune Mindset.", vimeoId: "" },
    { topic: "Anxiety & Panic Attack", title: "Finding Calm in the Storm: Managing Anxiety & Panic", description: "Learn practical strategies to regain control and find peace during moments of intense anxiety and panic.", vimeoId: "" },
    { topic: "Bipolar", title: "Bipolar Disorder: Navigating the Highs and Lows", description: "Understanding the complexities of bipolar disorder and finding the right tools and support for a balanced life.", vimeoId: "" },
    { topic: "Overcoming Paranoid", title: "Reclaiming Safety: Overcoming Paranoid Thoughts", description: "Ground yourself and challenge distorted thinking to reclaim your sense of security and peace of mind.", vimeoId: "" },
    { topic: "Stress & Shame", title: "Lifting the Weight: Healing from Stress and Shame", description: "You are not broken. Discover how to calm your nervous system and transform stress and shame into self-worth.", vimeoId: "" },
    { topic: "Trauma & PTSD", title: "Healing from Trauma: Your Journey to Recovery", description: "Break the silence and find the tools you need to heal from past trauma and move forward with purpose.", vimeoId: "" },
    { topic: "Disrespect", title: "Standing Strong: Handling Disrespect with Dignity", description: "Learn how to set firm boundaries and reclaim your power when facing disrespect at home, work, or online.", vimeoId: "" },
    { topic: "Motivational Interviewing", title: "Unlock Your Potential: The Power of Motivational Interviewing", description: "Discover your own reasons for change and take the first step toward a better future with Brett's guidance.", vimeoId: "" },
  ];

  const sandraVideos = [
    { topic: "Grief & Loss", title: "Healing Through Grief: Finding Meaning After Loss", description: "Sandra guides you through the silent storm of grief, offering compassion and tools to help you carry your loss differently.", vimeoId: "" },
    { topic: "Coercive Control", title: "Reclaiming Your Voice: Understanding Coercive Control", description: "Recognize the signs of manipulation and power dynamics, and find the support you need to rebuild your autonomy.", vimeoId: "" },
    { topic: "Sexual Abuse", title: "Courage to Heal: Recovery After Sexual Abuse", description: "Recovery is possible. Discover a safe path to reclaim your life, your body, and your future with professional support.", vimeoId: "" },
    { topic: "Suicide Prevention", title: "Holding on to Hope: A Guide to Suicide Prevention", description: "You don't have to face the crisis alone. Learn the vital steps to stay safe and find the light in the darkness.", vimeoId: "" },
    { topic: "Workplace Bullying", title: "Thriving at Work: Overcoming Workplace Bullying", description: "Don't suffer in silence. Learn how to identify bullying behavior and protect your mental health on the job.", vimeoId: "" },
    { topic: "Self-Esteem", title: "Building Unshakeable Self-Worth: Silence Your Inner Critic", description: "Discover that you are enough. Sandra helps you build the confidence to show up as your authentic self.", vimeoId: "" },
    { topic: "Relaxation", title: "The Art of Calm: Master Your Relaxation Practice", description: "Reconnect with your inner peace through guided techniques designed to soothe the body and clear the mind.", vimeoId: "" },
    { topic: "Journaling", title: "Writing Your Way to Healing: The Power of Journaling", description: "Untangle your thoughts and name your feelings. Discover how journaling can lead to clarity, healing, and peace.", vimeoId: "" },
  ];

  type VideoData = typeof brettVideos[0];

  const VideoCard = ({ video, therapist }: { video: VideoData; therapist: string }) => (
    <div className="group relative bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-card transition-all duration-300">
      {/* 9:16 Video Area */}
      <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
        {video.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&player_id=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <div className="absolute inset-0 bg-muted/50 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
              <Play className="w-7 h-7 text-primary ml-1" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">Video Coming Soon</span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{video.topic}</span>
        <h3 className="font-display text-sm font-semibold text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{video.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">{therapist[0]}</span>
          </div>
          <span className="text-xs text-muted-foreground">{therapist}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="video-library" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Video size={16} />
            Video Library
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Expert-Led Video{" "}
            <span className="text-primary italic">Resources</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Access our curated collection of therapeutic videos designed to support your mental health journey. Preview free content below or join our membership for full access.
          </p>
        </div>

        {/* Brett's Videos */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2 text-center">
            Brett Boyland
          </h3>
          <p className="text-muted-foreground text-center mb-8">Counsellor & Psychotherapist</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {brettVideos.map((video, index) => (
              <VideoCard key={index} video={video} therapist="Brett Boyland" />
            ))}
          </div>
        </div>

        {/* Sandra's Videos */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2 text-center">
            Sandra
          </h3>
          <p className="text-muted-foreground text-center mb-8">Therapist & Counsellor</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sandraVideos.map((video, index) => (
              <VideoCard key={index} video={video} therapist="Sandra" />
            ))}
          </div>
        </div>

        {/* Membership CTA */}
        <div className="animate-fade-up" style={{ animationDelay: "500ms" }}>
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
                <Crown size={16} />
                Premium Membership
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-primary-foreground mb-4">
                Unlock the Full Video Library
              </h3>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                Get unlimited access to all 16+ expert-led therapeutic videos, guided exercises, and exclusive content. New videos added regularly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-8"
                  asChild
                >
                  <a href="https://vimeo.com/ott" target="_blank" rel="noopener noreferrer">
                    Join Membership
                    <ArrowRight size={18} />
                  </a>
                </Button>
                <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <Lock size={14} />
                  <span>Membership setup coming soon via Vimeo OTT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoLibrary;
