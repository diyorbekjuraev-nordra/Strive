"use client";

import { useState, useCallback, useRef, useEffect, FC, memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/library/Button";
import { Sparkles, Target } from "lucide-react";
import { Badge } from "@/library/Badge";
import { debounce } from "lodash";
import type { DebouncedFunc } from "lodash";

interface AISliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  aiSuggestedValue: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  minLabel?: string;
  maxLabel?: string;
  aiLabel?: string;
  showSnapButton?: boolean;
  snapThreshold?: number;
  className?: string;
  formatValue?: (value: number) => string;
  showAI?: boolean;
  onChangeThrottled?: (value: number) => void;
  throttleDelay?: number;
}

const AISlider: FC<AISliderProps> = memo(
  ({
    min = 0,
    max = 100,
    step = 1,
    value,
    aiSuggestedValue,
    onChange,
    disabled = false,
    label,
    showSnapButton = true,
    snapThreshold = 5,
    className,
    showAI = true,
    onChangeThrottled,
    throttleDelay = 300,
    formatValue = (val) => val.toString(),
  }: AISliderProps) => {
    const [internalValue, setInternalValue] = useState(value);
    const [isDragging, setIsDragging] = useState(false);
    const [showSnapHint, setShowSnapHint] = useState(false);
    const debouncedOnChange = useRef<DebouncedFunc<(v: number) => void> | null>(
      null
    );

    useEffect(() => {
      if (onChangeThrottled) {
        debouncedOnChange.current = debounce(onChangeThrottled, throttleDelay);
      }
      return () => {
        debouncedOnChange.current?.cancel();
      };
    }, [onChangeThrottled, throttleDelay]);

    const userPosition = ((internalValue - min) / (max - min)) * 100;
    const aiPosition = ((aiSuggestedValue - min) / (max - min)) * 100;
    const isNearAISuggestion =
      Math.abs(internalValue - aiSuggestedValue) <= snapThreshold;

    const handleChange = useCallback(
      (newValue: number) => {
        if (disabled) return;

        setInternalValue(newValue);
      },
      [disabled]
    );

    const handleMouseDown = () => setIsDragging(true);

    const handleMouseUp = () => {
      if (disabled) return;

      const isSnap =
        Math.abs(internalValue - aiSuggestedValue) <= snapThreshold;

      const finalValue = isSnap ? aiSuggestedValue : internalValue;
      setInternalValue(finalValue);
      onChange?.(finalValue);
      debouncedOnChange.current?.(finalValue);

      if (isSnap) {
        setShowSnapHint(true);
        setTimeout(() => setShowSnapHint(false), 1000);
      }

      setIsDragging(false);
    };

    const snapToAI = useCallback(() => {
      if (!disabled) {
        setInternalValue(aiSuggestedValue);
        onChange?.(aiSuggestedValue);
        debouncedOnChange.current?.(aiSuggestedValue);
        setShowSnapHint(true);
        setTimeout(() => setShowSnapHint(false), 1000);
      }
    }, [disabled, aiSuggestedValue, onChange]);

    const formattedValue = formatValue(aiSuggestedValue);
    const valueNum = formattedValue?.split(" ")[0];
    const isZero = valueNum === "0" || valueNum === "0.0";
    const isHundred = valueNum === "100";

    return (
      <div className={cn("w-full space-y-1", className)}>
        {(label || showSnapButton) && (
          <div className="flex items-center justify-between">
            {label && (
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {label}
              </label>
            )}
            {showSnapButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={snapToAI}
                disabled={disabled || value === aiSuggestedValue}
                className={cn(
                  "h-7 px-2 text-xs transition-all duration-200 ",
                  isNearAISuggestion &&
                    "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-300",
                  showSnapHint &&
                    "animate-pulse border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-950 dark:text-green-300"
                )}
                append={<Target className="w-3 h-3 mr-1" />}
              >
                Snap to AI
              </Button>
            )}
          </div>
        )}

        {/* Slider track */}
        <div className="relative mb-4">
          <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className={cn(
                "absolute left-0 top-0 h-full transition-all duration-200 rounded-full",
                "bg-gradient-to-r from-blue-400 to-blue-500",
                disabled && "opacity-50"
              )}
              style={{ width: `${userPosition}%` }}
            />
            {showAI && (
              <div
                className="absolute top-0 h-full w-1 bg-blue-500 dark:bg-blue-400 transition-all duration-200"
                style={{ left: `${aiPosition}%` }}
              />
            )}
          </div>

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={internalValue}
            onChange={(e) => handleChange(Number(e.target.value))}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            disabled={disabled}
            className={cn(
              "absolute top-0 w-full h-2 opacity-0 cursor-pointer",
              disabled && "cursor-not-allowed"
            )}
          />

          {/* User Thumb */}
          <div
            className={cn(
              "absolute top-1/2 w-5 h-5 transform -translate-y-1/2 transition-all duration-200 group",
              "bg-white border-2 rounded-full shadow-lg pointer-events-none",
              isNearAISuggestion
                ? "border-[var(--interactive)] shadow-blue-200 dark:shadow-blue-800"
                : "border-blue-400 shadow-blue-200 dark:shadow-blue-800",
              isDragging && "scale-110 shadow-xl",
              disabled && "opacity-50 bg-gray-100 border-gray-300",
              userPosition < 5
                ? "translate-x-1"
                : userPosition > 95
                ? "-translate-x-full"
                : "-translate-x-1/2"
            )}
            style={{ left: `${userPosition}%` }}
          >
            {/* {showSnapHint && (
            <div className="absolute -top-15 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-500 text-white text-xs rounded whitespace-nowrap animate-fade-in">
              Snapped!
            </div>
          )} */}
            <Badge
              variant="info"
              className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {formatValue(internalValue)}
            </Badge>
          </div>

          {/* AI Thumb */}
          {showAI && (
            <>
              <div
                className={cn(
                  "absolute top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 transition-all duration-200",
                  "bg-purple-500 dark:bg-purple-400 rounded-full shadow-lg pointer-events-none",
                  "border-2 border-white dark:border-purple-900",
                  disabled && "opacity-50",
                  isZero && "translate-x-[40%]",
                  isHundred && "translate-x-[-110%]"
                )}
                style={{ left: `${aiPosition}%` }}
              >
                <Sparkles className="w-2 h-2 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div
                className={cn(
                  "text-xs text-purple-500 absolute top-7 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center",
                  isZero && "translate-x-[0%]",
                  isHundred && "translate-x-[-110%]"
                )}
                style={{ left: `${aiPosition}%` }}
              >
                {aiSuggestedValue !== internalValue && (
                  <span>{formatValue(aiSuggestedValue)}</span>
                )}
                <div className={cn("text-xs flex items-center  ")}>
                  <span>
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </span>
                  <span className="whitespace-nowrap ">AI Suggested</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export { AISlider, type AISliderProps };
