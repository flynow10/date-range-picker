import Slider from "@/src/Slider";

export default function App() {
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <p
        style={{
          marginBottom: "5px",
        }}
      >
        Slider Demo
      </p>
      <Slider
        minDate={new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000)}
        maxDate={new Date()}
        rangeMin={new Date("5/28/2024")}
        rangeMax={new Date("6/2/2024")}
      />
    </div>
  );
}
