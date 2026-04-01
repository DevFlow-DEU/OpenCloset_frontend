type UpdateMyProfileParams = {
  token: string | null;
  nickname: string;
  address: string;
  profileImage: File | null;
};

export async function updateMyProfile({
  token,
  nickname,
  address,
  profileImage,
}: UpdateMyProfileParams) {
  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('address', address);

  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  const res = await fetch(`${import.meta.env.VITE_BACK_URL}/mypage/edit`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    let message = '회원 정보 수정에 실패했습니다.';

    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch {
    }

    throw new Error(message);
  }

  return res.json();
}