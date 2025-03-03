import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import './countup.css';

export default function CountUp({
  to,
  from = 100,
  direction = "down",
  delay = 0, // Removed delay usage in favor of immediate start
  duration = 10, // Approximate duration of the animation in seconds
  className = "count",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);

  // Corrected direction logic:
  // For "up": start at 'from' and animate to 'to'
  // For "down": start at 'to' and animate to 'from'
  const initialValue = direction === "down" ? to : from;
  const targetValue = direction === "down" ? from : to;

  const motionValue = useMotionValue(initialValue);

  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, { damping, stiffness });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Set initial text content (with percentage symbol)
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = `${String(initialValue)}%`;
    }
  }, [initialValue]);

  // Start the animation when in view and remove the setTimeout delay.
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }
      // Immediately start the animation
      motionValue.set(targetValue);

      // Combine updating text content and checking for animation end in a single subscription
      const unsubscribe = springValue.on("change", (latest) => {
        if (ref.current) {
          const options = {
            useGrouping: !!separator,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          };

          const formattedNumber = Intl.NumberFormat("en-US", options).format(
            latest.toFixed(0)
          );
          ref.current.textContent = separator
            ? formattedNumber.replace(/,/g, separator) + "%"
            : formattedNumber + "%";
        }
        // If the current value is close enough to the target, trigger onEnd and unsubscribe.
        if (Math.abs(latest - targetValue) < 0.1) {
          if (typeof onEnd === "function") {
            onEnd();
          }
          unsubscribe();
        }
      });

      return () => unsubscribe();
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    springValue,
    direction,
    from,
    to,
    separator,
    onStart,
    onEnd,
    targetValue,
  ]);

  return <span className={className} ref={ref} />;
}
