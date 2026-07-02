import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import checkSrc from '../../assets/icon/Alert/check.svg';
import styles from './DeleteAccountComplete.module.css';

export default function DeleteAccountComplete() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.spacerTop} />
        <div className={styles.content}>
          <img src={checkSrc} alt="" className={styles.icon} />
          <div className={styles.gap44} />
          <p className={styles.title}>회원탈퇴가 완료되었습니다.</p>
          <div className={styles.gap24} />
          <p className={styles.descSecondary}>
            그동안 OPENCLOSET을 이용해 주셔서 감사합니다. <br />
            오픈 클로젯에서 옷을 빌리고, 나누고,<br />
            새로운 스타일을 경험해 주셔서 진심으로 감사드립니다.
          </p>
        </div>
        <div className={styles.spacerBottom} />
      </div>

      <div className={styles.fixedButton}>
        <Button variant="primary" type="button" onClick={() => navigate('/')}>
          처음 화면으로
        </Button>
      </div>
    </>
  );
}
