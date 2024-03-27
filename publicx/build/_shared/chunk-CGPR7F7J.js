import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";

// app/common/config.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/common/config.jsx"
  );
  import.meta.hot.lastModified = "1709382069643.5525";
}
var config = Object.freeze({
  //domain:[ "@algorisys.com","@gmail.com"],
  Export: false,
  showIsMiscellaneous: true,
  projectStatusCheck: ["inprogress", "new", "onHold"],
  monthCount: 3,
  maxInprogressTaskCount: 2,
  // socketPath: 'http://localhost:3002'
  storyPoint: "1 SP = 1 hr",
  minStoryPonit: "1",
  delayTime: 50,
  sitekey: "6LezHHgUAAAAAPTt97gKwfO3H6iDO3LJy4DvVw1R",
  profileUrl: "/api/ProfilePic/",
  defaultProjectName: "DefaultProject"
});
var config_default = config;

export {
  config_default
};
//# sourceMappingURL=/build/_shared/chunk-CGPR7F7J.js.map
