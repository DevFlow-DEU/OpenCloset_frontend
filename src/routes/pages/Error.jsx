import { useLocation, useNavigate } from "react-router-dom";

export default function AuthError() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const error = state?.error || "에러";
  const desc = state?.errorDesc || "알 수 없는 에러";

  return (
    <div style={{ padding: 24 }}>
      <p><b>{error}</b></p>
      <p>{desc}</p>

      <button onClick={() => navigate("/", { replace: true })}>
        홈으로
      </button>
    </div>
  );
}
