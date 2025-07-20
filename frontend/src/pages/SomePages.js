import React, { Suspense, lazy } from "react";
const HeavyComponent = lazy(() => import("./HeavyComponent"));

export default function SomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
