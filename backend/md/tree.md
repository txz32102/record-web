# tree basic

# leetcode
https://leetcode.com/problems/same-tree/
```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(!p && !q)
            return true;
        if(p && q && q->val == p->val)
            return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
        return false; 
    }
};
```
https://leetcode.com/problems/symmetric-tree/solutions/3290112/easy-solutions-in-java-python-and-c-look-at-once/

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).</br>
Input: root = [1,2,2,3,4,4,3]</br>
Output: true</br>
Input: root = [1,2,2,null,3,null,3]</br>
Output: false</br>
```c++
class Solution {
public:
    bool isMirror(TreeNode* left, TreeNode* right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        return (left->val == right->val) && isMirror(left->left, right->right) && isMirror(left->right, right->left);
    }

    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return isMirror(root->left, root->right);
    }

};
```

https://leetcode.com/problems/balance-a-binary-search-tree/description/?envType=daily-question&envId=2024-06-26
<svg
   width="206mm"
   height="207mm"
   viewBox="0 0 206 207"
   version="1.1"
   id="svg1"
   inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
   sodipodi:docname="绘图.svg"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="mm"
     inkscape:zoom="0.69575617"
     inkscape:cx="967.29289"
     inkscape:cy="545.44971"
     inkscape:window-width="1920"
     inkscape:window-height="991"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="g102" />
  <defs
     id="defs1">
    <rect
       x="860.93378"
       y="370.81955"
       width="517.42267"
       height="429.74826"
       id="rect2" />
  </defs>
  <g
     inkscape:label="图层 1"
     inkscape:groupmode="layer"
     id="layer1">
    <g
       transform="matrix(0.27339091,0,0,0.26458333,6.775843,97.731723)"
       id="g102">
      <text
         font-family="'Aptos Display', 'Aptos Display_MSFontService', sans-serif"
         font-weight="400"
         font-size="80px"
         id="text1"
         x="56.878639"
         y="85.003441">Inorder</text>
      <path
         d="m 393.00854,48.443838 h 9.834 v 39.9996 h -9.834 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path2" />
      <path
         d="m 402.84254,48.443838 h 93.26 v 39.9996 h -93.26 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path3" />
      <path
         d="m 496.10254,48.443838 h 9.833 v 39.9996 h -9.833 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path4" />
      <path
         d="m 505.93554,48.443838 h 92.213 v 39.9996 h -92.213 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path5" />
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="32px"
         id="text5"
         x="340.63248"
         y="80.440727">Left</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="32px"
         id="text6"
         x="409.00482"
         y="77.566154">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="32px"
         id="text7"
         x="420.92526"
         y="79.003441">&gt; Root</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="32px"
         id="text8"
         x="545.48242"
         y="75.410225">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="32px"
         id="text9"
         x="549.05597"
         y="76.128868">&gt; Right</text>
      <text
         font-family="'Aptos Display', 'Aptos Display_MSFontService', sans-serif"
         font-weight="400"
         font-size="80px"
         id="text10"
         x="33.025139"
         y="188.00343">Pr</text>
      <text
         font-family="'Aptos Display', 'Aptos Display_MSFontService', sans-serif"
         font-weight="400"
         font-size="80px"
         id="text11"
         x="100.56554"
         y="188.00343">e</text>
      <text
         font-family="'Aptos Display', 'Aptos Display_MSFontService', sans-serif"
         font-weight="400"
         font-size="80px"
         id="text12"
         x="140.06554"
         y="188.00343">order</text>
      <text
         font-family="'Aptos Display', 'Aptos Display_MSFontService', sans-serif"
         font-weight="400"
         font-size="75px"
         id="text13"
         x="17.222649"
         y="308.31531">Postorder</text>
      <path
         d="m 360.54154,283.70544 h 6.167 v 32 h -6.167 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path13" />
      <path
         d="m 410.20854,283.70544 h 7.333 v 32 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path15" />
      <path
         d="m 417.54154,283.70544 h 74.62 v 32 h -74.62 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path16" />
      <path
         d="m 492.16154,283.70544 h 7.333 v 32 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path17" />
      <path
         d="m 499.49454,283.70544 h 64.567 v 32 h -64.567 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path18" />
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text18"
         x="360.54153"
         y="309.00345"></text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text19"
         x="385.48679"
         y="296.78653">Left</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text20"
         x="443.59207"
         y="296.78653">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text21"
         x="449.53409"
         y="298.22382">&gt; Right</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text22"
         x="554.75574"
         y="299.6611">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text23"
         x="560.69775"
         y="301.81702">&gt; Root</text>
      <path
         d="m 403.19054,125.37044 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path23" />
      <path
         d="m 417.52354,125.37044 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path24" />
      <path
         d="m 424.85654,125.37044 h 14.334 v 30 h -14.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path25" />
      <path
         d="m 439.19054,125.37044 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path26" />
      <path
         d="m 446.52354,125.37044 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path27" />
      <path
         d="m 460.85654,125.37044 h 7.334 v 30 h -7.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path28" />
      <path
         d="m 468.19054,125.37044 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path29" />
      <path
         d="m 482.52354,125.37044 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path30" />
      <path
         d="m 489.85654,125.37044 h 14.334 v 30 h -14.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path31" />
      <path
         d="m 504.19054,125.37044 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path32" />
      <path
         d="m 511.52354,125.37044 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path33" />
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text33"
         x="403.19055"
         y="148.00343">4</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text34"
         x="417.52353"
         y="148.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text35"
         x="424.85654"
         y="148.00343">2</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text36"
         x="439.19055"
         y="148.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text37"
         x="446.52353"
         y="148.00343">5</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text38"
         x="460.85654"
         y="148.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text39"
         x="468.19055"
         y="148.00343">1</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text40"
         x="482.52353"
         y="148.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text41"
         x="489.85654"
         y="148.00343">3</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text42"
         x="504.19055"
         y="148.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text43"
         x="511.52353"
         y="148.00343">6</text>
      <path
         d="m 242.34375,-273.75685 c 0,-21.263 18.356,-38.5 41,-38.5 22.64,0 41,17.237 41,38.5 0,21.263 -18.36,38.5 -41,38.5 -22.644,0 -41,-17.237 -41,-38.5 z"
         stroke="#042433"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="#156082"
         fill-rule="evenodd"
         id="path43" />
      <text
         fill="#ffffff"
         font-family="Aptos, Aptos_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text44"
         x="276.93375"
         y="-266.25684">1</text>
      <path
         d="m 130.34375,-218.75685 c 0,-21.263 18.356,-38.5 41,-38.5 22.644,0 41,17.237 41,38.5 0,21.263 -18.356,38.5 -41,38.5 -22.644,0 -41,-17.237 -41,-38.5 z"
         stroke="#042433"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="#156082"
         fill-rule="evenodd"
         id="path44" />
      <text
         fill="#ffffff"
         font-family="Aptos, Aptos_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text45"
         x="164.90875"
         y="-211.25685">2</text>
      <path
         d="m 70.343747,-91.756853 c 0,-21.262997 18.132,-38.499997 40.500003,-38.499997 22.368,0 40.5,17.237 40.5,38.499997 0,21.263 -18.132,38.5 -40.5,38.5 -22.368003,0 -40.500003,-17.237 -40.500003,-38.5 z"
         stroke="#042433"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="#156082"
         fill-rule="evenodd"
         id="path45" />
      <text
         fill="#ffffff"
         font-family="Aptos, Aptos_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text46"
         x="104.83175"
         y="-84.256851">4</text>
      <path
         d="m 343.34375,-199.75685 c 0,-21.263 18.36,-38.5 41,-38.5 22.64,0 41,17.237 41,38.5 0,21.263 -18.36,38.5 -41,38.5 -22.64,0 -41,-17.237 -41,-38.5 z"
         stroke="#042433"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="#156082"
         fill-rule="evenodd"
         id="path46" />
      <text
         fill="#ffffff"
         font-family="Aptos, Aptos_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text47"
         x="377.88373"
         y="-192.25685">3</text>
      <path
         d="m 425.34375,-91.756853 c 0,-21.262997 18.13,-38.499997 40.5,-38.499997 22.37,0 40.5,17.237 40.5,38.499997 0,21.263 -18.13,38.5 -40.5,38.5 -22.37,0 -40.5,-17.237 -40.5,-38.5 z"
         stroke="#042433"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="#156082"
         fill-rule="evenodd"
         id="path47" />
      <text
         fill="#ffffff"
         font-family="Aptos, Aptos_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text48"
         x="459.00375"
         y="-84.256851">6</text>
      <path
         d="m 189.34375,-97.756853 c 0,-21.262997 18.132,-38.499997 40.5,-38.499997 22.368,0 40.5,17.237 40.5,38.499997 0,21.263 -18.132,38.5 -40.5,38.5 -22.368,0 -40.5,-17.237 -40.5,-38.5 z"
         stroke="#042433"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="#156082"
         fill-rule="evenodd"
         id="path48" />
      <text
         fill="#ffffff"
         font-family="Aptos, Aptos_MSFontService, sans-serif"
         font-weight="400"
         font-size="24px"
         id="text49"
         x="223.72777"
         y="-90.256851">5</text>
      <path
         d="m 242.81375,-273.25685 -71.4702,60.0549"
         stroke="#156082"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="none"
         fill-rule="evenodd"
         id="path49" />
      <path
         d="m 142.74275,-191.25685 -31.3992,61.3812"
         stroke="#156082"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="none"
         fill-rule="evenodd"
         id="path50" />
      <path
         d="m 200.34375,-191.25685 30.14,55.354"
         stroke="#156082"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="none"
         fill-rule="evenodd"
         id="path51" />
      <path
         d="m 324.34375,-273.25685 31.72,46.883"
         stroke="#156082"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="none"
         fill-rule="evenodd"
         id="path52" />
      <path
         d="m 413.34375,-172.25685 23.76,53.602"
         stroke="#156082"
         stroke-width="2"
         stroke-miterlimit="8"
         fill="none"
         fill-rule="evenodd"
         id="path53" />
      <path
         d="m 375.99854,188.91844 h 52.566 v 30 h -52.566 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path54" />
      <path
         d="m 428.56454,188.91844 h 7.334 v 30 h -7.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path55" />
      <path
         d="m 435.89854,188.91844 h 61 v 30 h -61 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path56" />
      <path
         d="m 496.89854,188.91844 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path57" />
      <path
         d="m 504.23154,188.91844 h 69.12 v 30 h -69.12 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path58" />
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text58"
         x="375.99854"
         y="212.00343">Root</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text59"
         x="447.34277"
         y="209.8475">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text60"
         x="453.98129"
         y="211.28479">&gt; Left</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text61"
         x="558.10175"
         y="209.12886">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text62"
         x="561.95728"
         y="210.56615">&gt; Right</text>
      <path
         d="m 436.93454,223.99944 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path62" />
      <path
         d="m 451.26754,223.99944 h 7.334 v 30 h -7.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path63" />
      <path
         d="m 458.60154,223.99944 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path64" />
      <path
         d="m 472.93454,223.99944 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path65" />
      <path
         d="m 480.26754,223.99944 h 14.334 v 30 h -14.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path66" />
      <path
         d="m 494.60154,223.99944 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path67" />
      <path
         d="m 501.93454,223.99944 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path68" />
      <path
         d="m 516.26754,223.99944 h 7.334 v 30 h -7.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path69" />
      <path
         d="m 523.60154,223.99944 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path70" />
      <path
         d="m 537.93454,223.99944 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path71" />
      <path
         d="m 545.26754,223.99944 h 14.334 v 30 h -14.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path72" />
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text72"
         x="436.93454"
         y="247.00343">1</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text73"
         x="451.26755"
         y="247.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text74"
         x="458.60153"
         y="247.00343">2</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text75"
         x="472.93454"
         y="247.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text76"
         x="480.26755"
         y="247.00343">4</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text77"
         x="494.60153"
         y="247.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text78"
         x="501.93454"
         y="247.00343">5</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text79"
         x="516.26752"
         y="247.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text80"
         x="523.60156"
         y="247.00343">3</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text81"
         x="537.93451"
         y="247.00343">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text82"
         x="545.26752"
         y="247.00343">6</text>
      <path
         d="m 470.67854,322.62844 h 14.334 v 30 h -14.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path82" />
      <path
         d="m 485.01254,322.62844 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path83" />
      <path
         d="m 492.34554,322.62844 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path84" />
      <path
         d="m 506.67854,322.62844 h 7.334 v 30 h -7.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path85" />
      <path
         d="m 514.01254,322.62844 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path86" />
      <path
         d="m 528.34554,322.62844 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path87" />
      <path
         d="m 535.67854,322.62844 h 14.334 v 30 h -14.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path88" />
      <path
         d="m 550.01254,322.62844 h 7.333 v 30 h -7.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path89" />
      <path
         d="m 557.34554,322.62844 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path90" />
      <path
         d="m 571.67854,322.62844 h 7.334 v 30 h -7.334 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path91" />
      <path
         d="m 579.01254,322.62844 h 14.333 v 30 h -14.333 z"
         fill="#ffffff"
         fill-rule="evenodd"
         id="path92" />
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text92"
         x="470.67853"
         y="346.00345">4</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text93"
         x="485.01254"
         y="346.00345">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text94"
         x="492.34555"
         y="346.00345">5</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text95"
         x="506.67853"
         y="346.00345">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text96"
         x="514.01251"
         y="346.00345">2</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text97"
         x="528.34552"
         y="346.00345">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text98"
         x="535.67853"
         y="346.00345">6</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text99"
         x="550.01251"
         y="346.00345">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text100"
         x="557.34552"
         y="346.00345">3</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text101"
         x="571.67853"
         y="346.00345">-</text>
      <text
         fill="#273239"
         font-family="Nunito, Nunito_MSFontService, sans-serif"
         font-weight="700"
         font-size="24px"
         id="text102"
         x="579.01251"
         y="346.00345">1</text>
      <text
         xml:space="preserve"
         transform="matrix(0.96778394,0,0,1,-65.122912,-392.37631)"
         id="text2"
         style="white-space:pre;shape-inside:url(#rect2);fill:#d22a5e" />
    </g>
  </g>
</svg>

```c++
class Solution {
public:
    TreeNode* balanceBST(TreeNode* root) {
	vector<int> data;
	inorder(root, data);
	int size = data.size();
	return createBST(data, 0, size - 1);
    }

    TreeNode* createTree(){
        TreeNode* root = new TreeNode(1);
        root->right = new TreeNode(2);
        root->right->right = new TreeNode(3);
        root->right->right->right = new TreeNode(4);
        return root;
    }

    void inorder(TreeNode* root, vector<int>& data){
        if(root == nullptr)
            return;
        inorder(root->left, data);
	data.push_back(root->val);
        inorder(root->right, data);
    }

    // 这个是跟着教程敲的.....纯纯学习学习
    TreeNode* createBST(const vector<int>& data, int start, int end){
    	if(start > end)
		return nullptr;
	int mid = start + (end - start) / 2;

	TreeNode* leftSubtree = createBST(data, start, mid - 1);
	TreeNode* rightSubtree = createBST(data, mid + 1, end);
	return new TreeNode(data[mid], leftSubtree, rightSubtree);
    }

    void printVector(vector<int> data){
    	for(auto i : data)
		cout << i << " ";
	cout << "\n";
    }

};
```