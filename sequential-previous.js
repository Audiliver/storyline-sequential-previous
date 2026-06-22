/**
 * Storyline Sequential Previous
 * Research, concept, implementation, and documentation:
 * Daniel Menezes (Audiliver)
 *
 * This script relies on internal Storyline runtime objects.
 * Test it again after republishing with future Storyline versions.
 */

(function goToStructuralPreviousSlide() {
  try {
    if (
      typeof DS === "undefined" ||
      !DS.presentation ||
      typeof DS.presentation.getFlatSlides !== "function" ||
      !DS.windowManager ||
      typeof DS.windowManager.getCurrentWindowSlide !== "function" ||
      !DS.pubSub ||
      typeof DS.pubSub.trigger !== "function" ||
      !DS.events ||
      !DS.events.request ||
      !DS.events.request.NEXT_SLIDE
    ) {
      console.error(
        "[Sequential Previous] Storyline runtime navigation is not available."
      );
      return;
    }

    var slides = DS.presentation.getFlatSlides(true);
    var currentSlide = DS.windowManager.getCurrentWindowSlide();

    if (!slides || !slides.length) {
      console.error(
        "[Sequential Previous] No slides were found in the project structure."
      );
      return;
    }

    if (!currentSlide || !currentSlide.absoluteId) {
      console.error(
        "[Sequential Previous] The current slide could not be identified."
      );
      return;
    }

    var currentIndex = slides.findIndex(function (slide) {
      return slide.absoluteId === currentSlide.absoluteId;
    });

    if (currentIndex === -1) {
      console.error(
        "[Sequential Previous] The current slide was not found in the project structure."
      );
      return;
    }

    if (currentIndex === 0) {
      console.info(
        "[Sequential Previous] The learner is already on the first slide."
      );
      return;
    }

    var previousSlide = slides[currentIndex - 1];

    if (!previousSlide || !previousSlide.absoluteId) {
      console.error(
        "[Sequential Previous] The previous structural slide could not be identified."
      );
      return;
    }

    DS.pubSub.trigger(
      DS.events.request.NEXT_SLIDE,
      previousSlide.absoluteId,
      "_current"
    );
  } catch (error) {
    console.error("[Sequential Previous] Unexpected error:", error);
  }
})();
