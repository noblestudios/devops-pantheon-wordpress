<?php
/**
 *
 * Build navigation trees
 *
 **/

class MenuBuilder
{
     /**
     * pretty much a wrapper for getMenuItems
     *
     * @param string $menuName name of menu that you want
     * @return object Returns object containing menu or fasle if none
     **/
    public static function buildNav($menuName)
    {
        $menu = self::getMenuItems($menuName);
        return $menu;
    }

    /**
     * Return a menu opject structured as a tree
     * Keeps parent child realationships.
     *
     * @param string $menuName name of menu that you want
     * @return object Returns object containing menu or fasle if none
     **/
    public static function getMenuItems($menuName)
    {
        $menuObject = wp_get_nav_menu_items($menuName);
        if (isset($menuObject) && $menuObject!=false) {
            $menuItemsFormatted = array();
            foreach ($menuObject as $item) {
                $menuItemsFormatted[$item->{'ID'}] = self::createMenuItem($item);
            }
            return self::buildMenuTree($menuItemsFormatted, 0);
        } else {
            return false;
        }
    }

     /**
     * Iterates through and retrieves menu item properities.
     *
     * @param object $item a menu item object
     * @return object Returns formated object with what ever we want
     **/
    private static function createMenuItem($item)
    {
        $menuItem = new \stdClass();
        $menuItem->id = (int)$item->{'ID'};
        $menuItem->title = $item->{'title'};
        $menuItem->attr_title = $item->{'attr_title'};
        $menuItem->order = (int)$item->{'menu_order'};
        $menuItem->parent = (int)$item->{'menu_item_parent'};
        $menuItem->type = $item->{'object'};
        $menuItem->postId = (int)$item->{'object_id'};
        $menuItem->url = $item->{'url'};
        $menuItem->attribute = $item->{'attr_title'};
        $menuItem->classes = $item->{'classes'};
        $menuItem->target = $item->{'target'};
        $menuItem->children = array();

        return $menuItem;
    }

     /**
     * Builds the actual tree
     * called recursivly and so it can handle menus as deep as we can make
     *
     * @param array $tree of formated items
     * @param int of the current parent id
     * @return array Returns array of formated items in parent child relationship
     **/
    private static function buildMenuTree(array $tree, $parentId = 0)
    {
        $treeArray = array();
        foreach ($tree as $branch) {
            if ($branch->parent === $parentId) {
                $branch->children = self::buildMenuTree($tree, $branch->id);
                $treeArray[] = $branch;
            }
        }
        return$treeArray;
    }
}
