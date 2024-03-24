import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, } from 'next-auth/react';

interface MenuItem {
  id: string;
  company: number;
  icon: string;
  label: string;
  link: string;
  parent_id: string;
}

export default function SubLeftMenu({ parent_id }: { parent_id: string | number }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: session } = useSession();

  const [children, setChildren] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (session?.user.menu) {
      const filteredChildren = session.user.menu.filter(objeto => objeto.parent_id === parent_id);

      setChildren(filteredChildren);
    }
  }, [session?.user.menu, parent_id]);

  return (
    <>
      {children && children.length > 0 && (
        <ul className="menu-sub">
          {children.map((item, index) => (
            <li key={index} className={`menu-item ${currentPath === item.link ? 'active' : ''}`}>
              <a href={item.link} className="menu-link">
                <div data-i18n="Without menu">{item.label}</div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}