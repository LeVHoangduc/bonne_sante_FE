import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import SupportIcon from '@mui/icons-material/Support';
import HelpIcon from '@mui/icons-material/Help';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styles from './Setting.module.css';

export default function SettingsScreen() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeIcon fontSize="large" />
        <span className={styles.headerText}>Setting</span>
      </div>

      <div className={styles.row}>
        <PersonIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>My profile</span>
        <ArrowRightIcon fontSize="large" className={styles.arrowIcon} />
      </div>

      <div className={styles.row}>
        <FavoriteIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>Health App</span>
        <ArrowRightIcon fontSize="large" className={styles.arrowIcon} />
      </div>

      <div className={styles.row}>
        <ShareIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>Share the app</span>
      </div>

      <div className={styles.row}>
        <LockIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>Privacy policy settings</span>
      </div>

      <div className={styles.row}>
        <DescriptionIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>Terms of use</span>
      </div>

      <div className={styles.row}>
        <SupportIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>Support</span>
      </div>

      <div className={styles.row}>
        <HelpIcon fontSize="large" className={styles.icon} />
        <span className={styles.rowText}>FAQ</span>
      </div>

      <div className={styles.deleteAccountRow}>
        <span className={styles.deleteAccountText}>Delete account</span>
      </div>
    </div>
  );
}
