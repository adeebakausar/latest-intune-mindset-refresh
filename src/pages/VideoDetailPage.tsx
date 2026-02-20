import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Clock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type SuggestedVideo = {
  name: string;
  vimeoLink: string;
  durationSec: number;
};

type VideoTopicData = {
  topic: string;
  title: string;
  description: string;
  fileName: string;
  therapist: string;
  suggestedVideos: SuggestedVideo[];
};

const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s > 0 ? `${s}s` : ""}`.trim() : `${s}s`;
};

const brettTopics: Record<string, VideoTopicData> = {
  "anger-management": {
    topic: "Anger Management",
    title: "Overcoming Anger: Tools for a Calmer Life",
    description: "Discover how to transform anger into clarity and balance with expert guidance from Brett at Intune Mindset.",
    fileName: "Brett/Intune_Mindset__Anger_Management_with_Brett_b91d7d.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [
      { name: "Intune Mindset Self-Care Anger Videos – Your Path to Calm, Clarity & Confidence", vimeoLink: "https://vimeo.com/1109909304", durationSec: 68 },
      { name: "Empower Your Wellbeing at Intune Mindset", vimeoLink: "https://vimeo.com/1107290125", durationSec: 37 },
      { name: "Understanding Anger and Emotional Regulation", vimeoLink: "https://vimeo.com/1106984138", durationSec: 268 },
      { name: "Transforming Self-Talk for Anger Management", vimeoLink: "https://vimeo.com/1106983737", durationSec: 369 },
      { name: "Mastering Your Anger Response", vimeoLink: "https://vimeo.com/1106983587", durationSec: 292 },
    ],
  },
  "anxiety-panic-attack": {
    topic: "Anxiety & Panic Attack",
    title: "Finding Calm in the Storm: Managing Anxiety & Panic",
    description: "Learn practical strategies to regain control and find peace during moments of intense anxiety and panic.",
    fileName: "Brett/Intune_Mindset__Anxiety_Journey_with_Brett_e1b45b.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [
      { name: "Intune Mindset: Mastering Calm – Your Guide to Anxiety & Panic Recovery", vimeoLink: "https://vimeo.com/1110187003", durationSec: 68 },
      { name: "Understanding Social Anxiety with Dr. Mike", vimeoLink: "https://vimeo.com/1109848035", durationSec: 318 },
      { name: "Finding Calm in Anxiety", vimeoLink: "https://vimeo.com/1109847892", durationSec: 307 },
    ],
  },
  "bipolar": {
    topic: "Bipolar",
    title: "Bipolar Disorder: Navigating the Highs and Lows",
    description: "Understanding the complexities of bipolar disorder and finding the right tools and support for a balanced life.",
    fileName: "Brett/Bipolar_Awareness_-_Intune_Mindset_6a0423.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [
      { name: "Understanding Bipolar Disorder and Finding Help", vimeoLink: "https://vimeo.com/1111856475", durationSec: 102 },
      { name: "Understanding Bipolar Disorder and Its Management", vimeoLink: "https://vimeo.com/1110198319", durationSec: 522 },
      { name: "CBT for Managing Bipolar Disorder", vimeoLink: "https://vimeo.com/1110198166", durationSec: 352 },
      { name: "From Chaos to Clarity – Living Well with Bipolar", vimeoLink: "https://vimeo.com/1110197975", durationSec: 522 },
    ],
  },
  "overcoming-paranoid": {
    topic: "Overcoming Paranoid",
    title: "Reclaiming Safety: Overcoming Paranoid Thoughts",
    description: "Ground yourself and challenge distorted thinking to reclaim your sense of security and peace of mind.",
    fileName: "Brett/Overcoming_Paranoia_with_Brett_3c9a6e.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [],
  },
  "stress-shame": {
    topic: "Stress & Shame",
    title: "Lifting the Weight: Healing from Stress and Shame",
    description: "You are not broken. Discover how to calm your nervous system and transform stress and shame into self-worth.",
    fileName: "Brett/Stress_&_Shame_-_Intune_Mindset_e7c6a8.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [
      { name: "Understanding CBT for Stress Management", vimeoLink: "https://vimeo.com/1131971849", durationSec: 368 },
      { name: "Managing Stress: Tools for Relief", vimeoLink: "https://vimeo.com/1131971607", durationSec: 307 },
      { name: "Healing from Shame: A Path Forward", vimeoLink: "https://vimeo.com/1131971398", durationSec: 312 },
      { name: "Healing from Stress and Shame", vimeoLink: "https://vimeo.com/1131971326", durationSec: 69 },
    ],
  },
  "trauma-ptsd": {
    topic: "Trauma & PTSD",
    title: "Healing from Trauma: Your Journey to Recovery",
    description: "Break the silence and find the tools you need to heal from past trauma and move forward with purpose.",
    fileName: "Brett/Breaking_the_Silence__Trauma_&_PTSD_Recovery_432dfa.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [
      { name: "Healing from Trauma: A Practical Guide", vimeoLink: "https://vimeo.com/1117329679", durationSec: 909 },
      { name: "Understanding Trauma and Healing Steps", vimeoLink: "https://vimeo.com/1110793078", durationSec: 419 },
      { name: "Healing from PTSD: Steps to Recovery", vimeoLink: "https://vimeo.com/1110793014", durationSec: 99 },
    ],
  },
  "disrespect": {
    topic: "Disrespect",
    title: "Standing Strong: Handling Disrespect with Dignity",
    description: "Learn how to set firm boundaries and reclaim your power when facing disrespect at home, work, or online.",
    fileName: "Brett/How_to_Handle_Disrespect___Intune_Mindset_897614.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [],
  },
  "motivational-interviewing": {
    topic: "Motivational Interviewing",
    title: "Unlock Your Potential: The Power of Motivational Interviewing",
    description: "Discover your own reasons for change and take the first step toward a better future with Brett's guidance.",
    fileName: "Brett/Motivational_Interviewing_with_Brett_babbfa.mp4",
    therapist: "Brett Boyland",
    suggestedVideos: [
      { name: "Understanding Motivational Interviewing Techniques", vimeoLink: "https://vimeo.com/1110209664", durationSec: 395 },
      { name: "Empowering Change Through Motivational Interviewing", vimeoLink: "https://vimeo.com/1110209486", durationSec: 299 },
    ],
  },
};

const sandraTopics: Record<string, VideoTopicData> = {
  "grief-loss": {
    topic: "Grief & Loss",
    title: "Healing Through Grief: Finding Meaning After Loss",
    description: "Sandra guides you through the silent storm of grief, offering compassion and tools to help you carry your loss differently.",
    fileName: "Sandra/Navigating_Grief_&_Loss_with_Sandra_27324d.mp4",
    therapist: "Sandra",
    suggestedVideos: [
      { name: "Healing Through Grief and Loss", vimeoLink: "https://vimeo.com/1111870644", durationSec: 85 },
      { name: "Navigating Grief and Healing Together", vimeoLink: "https://vimeo.com/1111204474", durationSec: 355 },
      { name: "Navigating Grief: You Are Not Alone", vimeoLink: "https://vimeo.com/1111184095", durationSec: 231 },
    ],
  },
  "coercive-control": {
    topic: "Coercive Control",
    title: "Reclaiming Your Voice: Understanding Coercive Control",
    description: "Recognize the signs of manipulation and power dynamics, and find the support you need to rebuild your autonomy.",
    fileName: "Sandra/Sandra__Breaking_Free_from_Coercive_Control_939992.mp4",
    therapist: "Sandra",
    suggestedVideos: [
      { name: "Understanding Coercive Control and Its Impact", vimeoLink: "https://vimeo.com/1110200610", durationSec: 413 },
      { name: "Understanding Coercive Control and Its Effects", vimeoLink: "https://vimeo.com/1110200467", durationSec: 329 },
      { name: "Understanding Financial Abuse in Relationships", vimeoLink: "https://vimeo.com/1109850653", durationSec: 373 },
    ],
  },
  "sexual-abuse": {
    topic: "Sexual Abuse",
    title: "Courage to Heal: Recovery After Sexual Abuse",
    description: "Recovery is possible. Discover a safe path to reclaim your life, your body, and your future with professional support.",
    fileName: "Sandra/Healing_and_Hope__Overcoming_Sexual_Abuse_3d9183.mp4",
    therapist: "Sandra",
    suggestedVideos: [],
  },
  "suicide-prevention": {
    topic: "Suicide Prevention",
    title: "Holding on to Hope: A Guide to Suicide Prevention",
    description: "You don't have to face the crisis alone. Learn the vital steps to stay safe and find the light in the darkness.",
    fileName: "Sandra/Suicide_Prevention__Showing_Up_with_Sandra_25c80c.mp4",
    therapist: "Sandra",
    suggestedVideos: [
      { name: "Self-Help Guide for Suicide Prevention", vimeoLink: "https://vimeo.com/1117714609", durationSec: 250 },
      { name: "Suicide Prevention: Your Voice Matters", vimeoLink: "https://vimeo.com/1117714571", durationSec: 75 },
    ],
  },
  "workplace-bullying": {
    topic: "Workplace Bullying",
    title: "Thriving at Work: Overcoming Workplace Bullying",
    description: "Don't suffer in silence. Learn how to identify bullying behavior and protect your mental health on the job.",
    fileName: "Sandra/Workplace_Bullying__Reclaim_Your_Peace_946e78.mp4",
    therapist: "Sandra",
    suggestedVideos: [],
  },
  "self-esteem": {
    topic: "Self-Esteem",
    title: "Building Unshakeable Self-Worth: Silence Your Inner Critic",
    description: "Discover that you are enough. Sandra helps you build the confidence to show up as your authentic self.",
    fileName: "Sandra/Sandra_-_Self-Esteem_Journey_f58136.mp4",
    therapist: "Sandra",
    suggestedVideos: [
      { name: "Building Self-Esteem Together", vimeoLink: "https://vimeo.com/1131995956", durationSec: 330 },
      { name: "Rebuild Your Self-Esteem Today", vimeoLink: "https://vimeo.com/1131995618", durationSec: 65 },
      { name: "Navigating Conflict with Care", vimeoLink: "https://vimeo.com/1109860413", durationSec: 281 },
    ],
  },
  "relaxation": {
    topic: "Relaxation",
    title: "The Art of Calm: Master Your Relaxation Practice",
    description: "Reconnect with your inner peace through guided techniques designed to soothe the body and clear the mind.",
    fileName: "Sandra/Intune Mindset_ Finding Your Calm (60s Plan)''_1080p_caption.mp4",
    therapist: "Sandra",
    suggestedVideos: [
      { name: "Progressive Muscle Relaxation Session", vimeoLink: "https://vimeo.com/1110218507", durationSec: 302 },
      { name: "Journey to Inner Peace", vimeoLink: "https://vimeo.com/1109854209", durationSec: 216 },
      { name: "Grounding Exercise for Calmness and Presence", vimeoLink: "https://vimeo.com/1109854061", durationSec: 289 },
      { name: "Embracing Inner Peace Through Visualization", vimeoLink: "https://vimeo.com/1109853937", durationSec: 201 },
    ],
  },
  "journaling": {
    topic: "Journaling",
    title: "Writing Your Way to Healing: The Power of Journaling",
    description: "Untangle your thoughts and name your feelings. Discover how journaling can lead to clarity, healing, and peace.",
    fileName: "Sandra/Journaling_with_Sandra_-_Intune_Mindset_4d3228.mp4",
    therapist: "Sandra",
    suggestedVideos: [
      { name: "Journaling for Clarity: Write Your Way to Calm, Confidence and Growth", vimeoLink: "https://vimeo.com/1111873029", durationSec: 366 },
      { name: "The Power of Journaling for Healing", vimeoLink: "https://vimeo.com/1110203515", durationSec: 366 },
    ],
  },
};

const allTopics: Record<string, VideoTopicData> = { ...brettTopics, ...sandraTopics };

const VideoDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const topicData = slug ? allTopics[slug] : undefined;

  const getVideoUrl = (fileName: string) => {
    const { data } = supabase.storage.from("videos").getPublicUrl(fileName);
    return data.publicUrl;
  };

  if (!topicData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-semibold text-foreground mb-4">Video Not Found</h1>
          <Link to="/resources" className="text-primary hover:underline">← Back to Resources</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-wide mx-auto px-4">
          {/* Back link */}
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Resources
          </Link>

          {/* Topic header */}
          <div className="mb-8">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{topicData.therapist}</span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mt-2 mb-3">
              {topicData.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">{topicData.description}</p>
          </div>

          {/* Free video player */}
          <div className="mb-12">
            <div className="rounded-2xl overflow-hidden border border-border/50 bg-card max-w-3xl">
              <div className="relative w-full" style={{ aspectRatio: "9/16", maxHeight: "70vh" }}>
                <video
                  src={getVideoUrl(topicData.fileName)}
                  className="w-full h-full object-contain bg-black"
                  controls
                  preload="metadata"
                  title={topicData.title}
                />
              </div>
              <div className="p-4 flex items-center gap-2">
                <Play size={14} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Free Preview</span>
              </div>
            </div>
          </div>

          {/* Suggested paid videos */}
          {topicData.suggestedVideos.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Crown size={20} className="text-primary" />
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Continue Learning – Premium Videos
                </h2>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Dive deeper into {topicData.topic} with these expert-led premium videos on Vimeo.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topicData.suggestedVideos.map((sv, i) => (
                  <a
                    key={i}
                    href={sv.vimeoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-xl border border-border/50 bg-card p-5 hover:border-primary/30 hover:shadow-card transition-all duration-300"
                  >
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {sv.name}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Clock size={12} />
                        <span>{formatDuration(sv.durationSec)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-xs font-medium">
                        Watch on Vimeo
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoDetailPage;
